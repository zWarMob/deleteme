# Functions

## `app`

### `app.Version`

Gets the commit hash and tag (if exists) of the currently running service.

```
rpc Version (VersionRequest) returns (VersionResponse)
```

## `storage`

### `storage.Store`

Takes a `storage.StoreRequest` and Stores its contents in encrypted form. This call can fail if the
Storage Service cannot reach the object storage, in which case an error is returned.

```
rpc Store (StoreRequest) returns (StoreResponse)
```

### `storage.Retrieve`

Fetches a previously Stored object and returns the plaintext content. This call can fail if the
specified object does not exist, if the caller does not have access permission to that object, or if
the Storage Service cannot reach the object storage. In these cases, an error is returned.

```
rpc Retrieve (RetriveRequest) returns (RetriveResponse)
```

### `storage.Update`

Takes a `storage.UpdateRequest` and Stores it in encrypted form, replacing the data previously
stored with the given Object ID. This call can fail if the specified Object ID does not currently
exist, if the caller does not have access permission to that object, or if the Storage Service
cannot reach the object storage. In these cases, an error is returned.

> DISCLAIMER: Current implementation of `storage.Update` does not ensure safe concurrent access.

```
rpc Update (UpdateRequest) returns (UpdateResponse)
```

### `storage.Delete`

Deletes a previously Stored object. This call does not fail if the specified object does not exist.
It can fail if the caller does not have access permission to that object or if the Storage Service
cannot reach the object storage. In these cases, an error is returned.

> DISCLAIMER: Current implementation of `storage.Delete` does not ensure safe concurrent access.

```
rpc Delete (DeleteRequest) returns (DeleteResponse)
```

## `enc`

### `enc.Encrypt`

Takes an `enc.EncryptRequest` and encrypts its contents returning the ciphertext **without** storing it.

```
rpc Encrypt (EncryptRequest) returns (EncryptResponse) 
```

### `enc.Decrypt`

Takes a `enc.DecryptRequest`, authorizes the user for access permissions and if accessible, 
returns the decrypted content.

```
rpc Decrypt (DecryptRequest) returns (DecryptResponse)
```

## `authn`

### `authn.CreateUser`

Creates a new user. Also creates a group with the same ID as the user and the same scopes. The user
is added to this group. This call can fail if the caller is lacking the required scope or if the
Auth Service cannot reach the auth storage, in which case an error is returned.

```
rpc CreateUser (CreateUserRequest) returns (CreateUserResponse)
```

### `authn.LoginUser`

Logs in an existing user, returning a User Access Token. Note that this token is valid for 1 hour.
This call can fail if the caller provides the wrong credentials or if the Auth Service cannot reach
the auth storage, in which case an error is returned.

```
rpc LoginUser (LoginUserRequest) returns (LoginUserResponse)
```

### `authn.RemoveUser`

Deletes an existing user. This call can fail if the caller is lacking the required scope, if the
user does not exist, or if the Auth Service cannot reach the auth storage, in which case an error is
returned.

```
rpc RemoveUser (RemoveUserRequest) returns (RemoveUserResponse)
```

### `authnCreateGroup`
Creates a new group. This call can fail if the caller is lacking the required scope or if the Auth
Service cannot reach the auth storage, in which case an error is returned.

```
rpc CreateGroup (CreateGroupRequest) returns (CreateGroupResponse)
```

### `authnAddUserToGroup`
Adds a user to a group. This call can fail if the caller is lacking the required scope or if the
Auth Service cannot reach the auth storage, in which case an error is returned.

```
rpc AddUserToGroup (AddUserToGroupRequest) returns (AddUserToGroupResponse)
```

### `authnRemoveUserFromGroup`
Removes a user from a group. This call can fail if the caller is lacking the required scope or if
the Auth Service cannot reach the auth storage, in which case an error is returned.

```
rpc RemoveUserFromGroup (RemoveUserFromGroupRequest) returns (RemoveUserFromGroupResponse)
```

## `authz`

### `authz.GetPermissions`

Returns a list of groups with access to the specified object. This call can fail if the Storage
Service cannot reach the auth storage, in which case an error is returned. The calling user has to
be authenticated and authorized to access the object in order to get the object permissions.

```
rpc GetPermissions (GetPermissionsRequest) returns (GetPermissionsResponse)
```

### `authz.AddPermission`

Adds a group to the access list of the specified object. This call can fail if the caller does not
have access to the object, if the target group does not exist, or if the Storage Service cannot
reach the auth storage. In these cases, an error is returned.

```
rpc AddPermission (AddPermissionRequest) returns (ReturnCode)
```

### `authz.RemovePermission`

Removes a group from the access list of the specified object. This call can fail if the caller does
not have access to the object or if the Storage Service cannot reach the auth storage. In these
cases, an error is returned.

```
rpc RemovePermission (RemovePermissionRequest) returns (ReturnCode)
```
