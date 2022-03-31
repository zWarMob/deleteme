# Overview
This document introduces the API for the Encryptionize&reg; Service v3.2.0.

The Encryptonize&reg; API exposes several service addresses: `app.Encryptonize`,
`storage.Encryptonize`, `enc.Encryptonize`, `authz.Encryptonize`, `authn.Encryptonize`, which define the following functions

### `app.Encryptonize`:
* `rpc Version (VersionRequest) returns (VersionResponse)`

### `storage.Encryptonize`:
* `rpc Store (StoreRequest) returns (StoreResponse)`
* `rpc Retrieve (RetriveRequest) returns (RetriveResponse)`
* `rpc Update (UpdateRequest) returns (UpdateResponse)`
* `rpc Delete (DeleteRequest) returns (DeleteResponse)`

### `enc.Encryptonize`:
* `rpc Encrypt (EncryptRequest) returns (EncryptResponse)`
* `rpc Decrypt (DecryptRequest) returns (DecryptResponse)`

### `authn.Encryptonize`:
* `rpc CreateUser (CreateUserRequest) returns (CreateUserResponse)`
* `rpc LoginUser (LoginUserRequest) returns (LoginUserResponse)`
* `rpc RemoveUser (RemoveUserRequest) returns (RemoveUserResponse)`
* `rpc CreateGroup (CreateGroupRequest) returns (CreateGroupResponse)`
* `rpc AddUserToGroup (AddUserToGroupRequest) returns (AddUserToGroupResponse)`
* `rpc RemoveUserFromGroup (RemoveUserFromGroupRequest) returns (RemoveUserFromGroupResponse)`

### `authz.Encryptonize`:
* `rpc GetPermissions (GetPermissionsRequest) returns (GetPermissionsResponse)`
* `rpc AddPermission (AddPermissionRequest) returns (AddPermissionResponse)`
* `rpc RemovePermission (RemovePermissionRequest) returns (RemovePermissionResponse)`