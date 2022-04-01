# Encryptonize&reg; Kubernetes Deployment

This folder contains a minimal Kubernetes deployment of Encryptonize&reg;. The setup consists of
three separate clusters, although the components can be deployed in a single cluster, depending on
your threat model.

A makefile is provided for easy deployment. It calls the scripts in the `scripts`
folder which assume the deployment to be hosted on the Google Cloud Platform. It should be fairly
straight forward, however, to adapt these scripts for other providers or self-hosted solutions.

## Overview

Deploying Encryptonize&reg; consists of four main steps:
1. [Initial Setup](#setup)
2. [Deployment](#encryptonize-deployment)

Optionally you can choose to set up log aggregation as well, see [log aggregation section](#log-aggregation-optional) for details.

### Encryption Service

The Encryption Service is a simple service that can be deployed locally or in the cloud. It is the
only point in the system where users are authenticated, access is authorized, and data is
encrypted/decrypted. The service is essentially stateless (aside from key material), and therefore
relies on two services for permanent storage: **Auth storage** and **Object storage**.

### Storage

The **Auth storage** is an SQL database which holds data used by the Encryption Service for
authentication and authorization. In this deployment we use
[CockroachDB](https://github.com/cockroachdb/cockroach) to provide a distributed SQL database which
is highly scalable and resilient to failures. It is designed to be easy to deploy in multiple
locations and across multiple clouds.

The **Object storage** is an S3 compatible storage where the Encryption services stores all
encrypted data. In this deployment we use [Rook-Ceph](https://rook.io/) which is a combination of
the Kubernetes storage orchestrator Rook and the distributed storage system Ceph. Ceph is a highly
scalable and redundant storage solution which supports block, file, and object storage. Rook makes
it easy to deploy Ceph using Kubernetes, and helps to keep the Ceph cluster healthy.

### Log Gathering

In order to centralize traceability and auditability we optionally we provide a Fluentbit /
Elasticsearch / Kibana stack for log aggregation and analysis.

[Fluentbit](https://fluentbit.io/) is a lightweight log-scraping agent which scrapes, processes and
delivers logs to a specified environment. Fluentbit is highly modular and comes with pre-built
modules for scraping in a Kubernetes environment, processing of Docker logs and outputting the logs
to Elasticsearch.

[Elasticsearch](https://www.elastic.co/elasticsearch/) is an indexing platform. It can process,
aggregate, store and retrieve logs. Especially the retrieval process is highly optimized.

[Kibana](https://www.elastic.co/kibana) is part the Elastic family and lives on top of the
Elasticsearch API. It provides an interface to quickly view the logs, create log statistics and
alerts.

### TLS Certificates

TLS connections are used between all components of the Encryptonize system. As TLS certificate
provisioning in Kubernetes highly depends on the desired setup, the Kubernetes files provided here
use [cert-manager](https://cert-manager.io/) to provision a self-signed certificate for the
Encryption Service, while pre-generated self-signed certificates are used between the components of
the deployment. For an serious setup we recommend setting up certificates using e.g. [Let's
Encrypt](https://letsencrypt.org/) or your organizations own PKI.

## Deployment

### Setup
You will need to set up one clusters to perform the deployment. We recommend setting up the cluster
with 5 nodes, each having a minimum of 2 vCPUs and 8GB of memory. For Google's Kubernetes Engine,
this can be achieved by running:
```bash
gcloud container clusters create $CLUSTER_NAME \
    --machine-type=e2-standard-2 \
    --num-nodes=5 \
    --zone=$ZONE \
  --logging=NONE
```
Note that while the node sizes and resource requests specified in the Kubernetes files are
sufficient to run the setup we recommend monitoring resource usage and adjust the values according
to your use case.

In order to use the provided makefile you will need to fill out the configuration in the two
environment files `env/deploy_env` and `env/provider_env`. Note
in particular that you will need to create a hostname for Encryptonize as defined in
`env/deploy_env`.

To deploy Encryptonize several secrets is required. The secrets required can be generated using the
`scripts/gen-secrets.sh`. The makefile will automatically do this if they
do not exist already.

### Encryptonize Deployment

For the cluster to be able to pull the Encryptonize image from a private registry a image pull secret
needs to be created and attached to the service account used to run the service. The service account
used by Encryptonize is configured to use a secret called `artifact-registry` placed in the
`encryptonize` namespace, but the secret needs to be created before the deployment will work.

Once the secrets is created, Encryptonize can be deployed by running
```bash
make deploy
```

After deployment, wait for an external IP to be provisioned for the `encryptonize-ingress` service.
You can check the status with
```bash
kubectl -n encryptonize get service/encryptonize-ingress
```
Assign the hostname you set in `env/deploy_env` (e.g. `api.example.com`) to the
provisioned IP.

### Log Aggregation (Optional)

To deploy log aggregation you will need to deploy Elasticsearch, Kibana and FluentBit in the cluster.
To deploy run
```bash
make logging
```

#### Accessing the Kibana UI

To access the Kibana UI, port-forward the `kibana-kb-http` service:
```bash
kubectl -n elasticsearch port-forward service/kibana-kb-http 5601
```

Go to `https://localhost:5601` (accept the self signed certificate) and login using user `elastic`
and the password obtained from the related Kubernetes secret:
```bash
kubectl -n elasticsearch get secret elasticsearch-es-elastic-user -o go-template='{{.data.elastic | base64decode}}'
```

#### Fluentbit Config
A few notes on the default configuration mainly from [the official documentation](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file).
The main configuration file supports four types of sections:

* Service - Global settings for the Fluentbit agent
* Input - Configurations for the source of the logs
* Filter - Used to add, select or drop logging events
* Output - Configurations for the ouput destination of the logs

These are the main modules of the Fluentbit pipeline. Here is a highlight of some of our default
settings:
* `Service.Flush = 2`: Fluentbit will flush the logs to the output every 2 nanoseconds.
* `Service.Log_Level = info`: Refers to the logging of the Fluentbit service itself and will log at
  'info' level.
* `Service.Daemon = off`: Fluentbit should not run as a background process since it has it's own
  container.
* `Input.Path`: Is the path of the container logs located on the node. Wildcards are used to select
  Encryptonize, Ceph, CRDB containers.
* `Input.Parser = Docker`: Since all our services are containerized, it is sensible to use the
  built-in Docker log parser.
* `Input.Mem_Buf_Limit = 5MB`: The amount of log data Fluentbit can hold at a time. The total
  throughput is therefore a function of this number and Service.Flush.
* `Filter.Name = es`: We use kubernetes filters to enrich the logs with extra fields such as container
  and pod names. The filter is also configured with custom parsers for the object-store, auth-store
  and the encryption-service.
* `Filter.Merge_Parser = <parser>`: Selects a parser which will be used to parse the contents of the
  "log" field (which is the stdout of the service). If the parser cannot match the content, it will
  skip parsing and the "log" field is preserved as is. Otherwise, the "log" field is split up into
  several fields.