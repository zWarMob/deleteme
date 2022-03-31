# Authorization

To authenticate a user needs to provide an access token via `authorization`. It should be in the form
`bearer <user access token>`. A correct authentication metadata query could look like this:
```json
{
  "authorization": "bearer AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
}
```

In order to obtain a token, see the `authn.CreateUser` and `authn.LoginUser` functions.

The access token consists of two parts separated by a dot (`.`). Each part is individually base64url
encoded. The first part is a wrapped encryption key. The second part is a serialized protobuf
message containing the user ID, a set of scopes, and an expiry time. This part is encrypted using
the wrapped key. The user ID is a UUID (version 4).

A user is created with a chosen set of scopes that governs the endpoints this user may access.
Any combination of the different scopes is valid. The scopes are:
- `READ`
- `CREATE`
- `INDEX`
- `OBJECTPERMISSIONS`
- `USERMANAGEMENT`
- `UPDATE`
- `DELETE`

To access the endpoints the following permissions are necessary:

| Name                        | Scope             |
|-----------------------------|-------------------|
| `app.Version`               |                   |
| `storage.Store`             | CREATE            |
| `storage.Retrieve`          | READ              |
| `storage.Update`            | UPDATE            |
| `storage.Delete`            | DELETE            |
| `enc.Encrypt`               | CREATE            |
| `enc.Decrypt`               | READ              |
| `authn.CreateUser`          | USERMANAGEMENT    |
| `authn.LoginUser`           |                   |
| `authn.RemoveUser`          | USERMANAGEMENT    |
| `authn.CreateGroup`         | USERMANAGEMENT    |
| `authn.AddUserToGroup`      | USERMANAGEMENT    |
| `authn.RemoveUserFromGroup` | USERMANAGEMENT    |
| `authz.GetPermissions`      | INDEX             |
| `authz.AddPermission`       | OBJECTPERMISSIONS |
| `authz.RemovePermission`    | OBJECTPERMISSIONS |


* An unauthenticated request to the API returns: `Unauthenticated 16`.
* An unauthorized request to the API returns: `PermissionDenied 7`.