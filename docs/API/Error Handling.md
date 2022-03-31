# Error Handling
The Encryptonize&reg; API uses [grpc/codes](https://godoc.org/google.golang.org/grpc/codes) and
[grpc/status](https://godoc.org/google.golang.org/grpc/status) for error messages. The main error
codes returned by the service is:
* *InvalidArgument (3)*: The user supplied an argument that was invalid.
* *Unauthenticated (16)*: The user was not authenticated.
* *PermissionDenied (7)*: The user was not authorized.
* *Internal (13)*: An internal error occurred. Most likely one of the storage servers is in an
  unhealthy state.