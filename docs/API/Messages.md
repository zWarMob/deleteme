# Messages
The Encryptonize API defines several gRPC message types, mainly in the form of structs representing
requests and corresponding responses.

## `app`

### `app.VersionRequest`
The structure used as an argument for an `app.Version` request. The structure is empty.

### `app.VersionResponse`
The structure returned by an `app.Version` request. It contains the version information of the
currently running encryptonize deployment.

| Name        | Type   | Description                           |
|-------------|--------|---------------------------------------|
| `commit`    | string | Git commit hash                       |
| `tag`       | string | Git commit tag (if any)               |

## `storage`

### `storage.StoreRequest`
The structure used as an argument for a `storage.Store` request. It consists of the plaintext
(`plaintext`) and the associated data (`associated_data`). Requires the scope `CREATE`.

| Name              | Type   | Description                           |
|-------------------|--------|---------------------------------------|
| `plaintext`       | bytes  | The data to be encrypted              |
| `associated_data` | bytes  | The associated data for the plaintext |

### `storage.StoreResponse`
The structure returned by a `storage.Store` request. It contains the Object ID of the stored object.
The Object ID is important as it must be used to subsequently request the object in a
`storage.RetrieveRequest`.

| Name        | Type   | Description           |
|-------------|--------|-----------------------|
| `object_id` | string | The object identifier |

### `storage.RetrieveRequest`
The structure used as an argument for a `storage.Retrieve` request. It contains the Object ID of the
Object the client wishes to retrieve. Requires the scope `READ`.

| Name        | Type   | Description           |
|-------------|--------|-----------------------|
| `object_id` | string | The object identifier |

### `storage.RetrieveResponse`
The structure returned by a `storage.Retrieve` request. It consists of the plaintext (`plaintext`)
and the associated data (`associated_data`) matching the ID passed in the request.

| Name              | Type   | Description                           |
|-------------------|--------|---------------------------------------|
| `plaintext`       | bytes  | The data that was encrypted           |
| `associated_data` | bytes  | The associated data for the plaintext |

### `storage.UpdateRequest`
The structure used as an argument for a `storage.Update` request. It consists of the plaintext
(`plaintext`), the associated data (`associated_data`), and the Object ID of the object the client
wishes to update. Requires the scope `UPDATE`.

| Name              | Type   | Description                           |
|-------------------|--------|---------------------------------------|
| `plaintext`       | bytes  | The data to be encrypted              |
| `associated_data` | bytes  | The associated data for the plaintext |
| `object_id`       | string | The object identifier                 |

### `storage.UpdateResponse`
The structure returned by a `storage.Update` request. The structure is empty.

### `storage.DeleteRequest`
The structure used as an argument for a `storage.Delete` request. It containers the Object ID of the
Object the client wishes to delete. Requires the scope `DELETE`.

| Name        | Type   | Description           |
|-------------|--------|-----------------------|
| `object_id` | string | The object identifier |

### `storage.DeleteResponse`
The structure returned by a `storage.Delete` request. The structure is empty.

## `enc`

### `enc.EncryptRequest`
The structure used as an argument for a `enc.Encrypt` request. 
It consists of the plaintext (`plaintext`) and the associated data (`associated_data`). 
Requires the scope `CREATE`.

| Name              | Type   | Description                           |
|-------------------|--------|---------------------------------------|
| `plaintext`       | bytes  | The data to be encrypted              |
| `associated_data` | bytes  | The associated data for the plaintext |

### `enc.EncryptResponse`
The structure returned by a `enc.Encrypt` request. It contains the Object ID of the stored object,
the ciphertext of the provided plaintext, and the associated data.
All of the parameters are important as they must be used to subsequently request the object in a
`enc.DecryptRequest`.

| Name               | Type   | Description                           |
|--------------------|--------|---------------------------------------|
| `ciphertext`       | bytes  | Ciphertext of the provided plaintext  |
| `associated_data`  | bytes  | The associated data for the plaintext |
| `object_id`        | string | The object identifier                 |

### `enc.DecryptRequest`

The structure used as an argument for a `enc.Decrypt` request, it is identical to `enc.EncryptResponse`.
It consists of the previously received ciphertext, Object ID and the provided associated data.
Requires the scope `READ`.

| Name               | Type   | Description                           |
|--------------------|--------|---------------------------------------|
| `ciphertext`       | bytes  | The data to be decrypted              |
| `associated_data`  | bytes  | The associated data for the ciphertext|
| `object_id`        | string | The object identifier                 |

### `enc.DecryptResponse`

The structure returned by a `enc.Decrypt` request. It consists of the plaintext of the provided cipheretext, 
and the provided associated data.

| Name              | Type   | Description                           |
|-------------------|--------|---------------------------------------|
| `plaintext`       | bytes  | The data that was decrypted           |
| `associated_data` | bytes  | The associated data for the plaintext |

## `authn`

### `authn.CreateUserRequest`
The structure used as an argument for a `authn.CreateUser` request. It contains a list of scopes
defining which endpoints the user has access to. Possible scopes are `READ`, `CREATE`, `INDEX`,
`OBJECTPERMISSIONS`, and `USERMANAGEMENT`. Requires the scope `USERMANAGEMENT`.

| Name     | Type         | Description                                      |
|----------|--------------|--------------------------------------------------|
| `scopes` | []enum Scope | An array of scopes the newly created user posses |

### `authn.CreateUserResponse`
The structure returned by a `authn.CreateUser` request. It contains the User ID and Password of
the newly created user.

| Name       | Type   | Description            |
|------------|--------|------------------------|
| `user_id`  | string | The generated user id  |
| `password` | string | The generated password |

### `authn.LoginUserRequest`
The structure used as an argument for a `authn.LoginUser` request. It contains the User ID
and Password of a previously created user.

| Name       | Type   | Description            |
|------------|--------|------------------------|
| `user_id`  | string | The generated user id  |
| `password` | string | The generated password |

### `authn.LoginUserResponse`
The structure returned by a `authn.LoginUser` request. It contains the User Access Token.
Note that the User Access Token is valid for 1 hour.

| Name           | Type   | Description                |
|----------------|--------|----------------------------|
| `access_token` | string | The generated access token |

### `authn.RemoveUserRequest`
The structure used as an argument for a `authn.RemoveUser` request. It contains the User ID
of the user that will be removed. Requires the scope `USERMANAGEMENT`.

| Name       | Type   | Description        |
|------------|--------|--------------------|
| `user_id`  | string | The target user id |

### `authn.RemoveUserResponse`
The structure returned by a `authn.RemoveUser` request. The structure is empty.

### `authn.CreateGroupRequest`
The structure used as an argument for a `authn.CreateGroup` request. It contains a list of scopes
defining which endpoints the group has access to. Possible scopes are `READ`, `CREATE`, `INDEX`,
`OBJECTPERMISSIONS`, and `USERMANAGEMENT`. Requires the scope `USERMANAGEMENT`.

| Name     | Type         | Description                                       |
|----------|--------------|---------------------------------------------------|
| `scopes` | []enum Scope | An array of scopes the newly created group posses |

### `authn.CreateGroupResponse`
The structure returned by a `authn.CreateGroup` request. It contains the Group ID of the newly
created group.

| Name       | Type   | Description            |
|------------|--------|------------------------|
| `group_id` | string | The generated group id |

### `authn.AddUserToGroupRequest`
The structure used as an argument for a `authn.AddUserToGroup` request. It contains a User ID and a group ID. The specified user will be added to the specified group. Requires the scope `USERMANAGEMENT`.

| Name       | Type   | Description         |
|------------|--------|---------------------|
| `user_id`  | string | The target user id  |
| `group_id` | string | The target group id |

### `authn.AddUserToGroupResponse`
The structure returned by a `authn.AddUserToGroup` request. The structure is empty.

### `authn.RemoveUserFromGroupRequest`
The structure used as an argument for a `authn.RemoveUserFromGroup` request. It contains a User ID and a group ID. The specified user will be removed from the specified group. Requires the scope `USERMANAGEMENT`.

| Name       | Type   | Description         |
|------------|--------|---------------------|
| `user_id`  | string | The target user id  |
| `group_id` | string | The target group id |

### `authn.RemoveUserFromGroupResponse`
The structure returned by a `authn.RemoveUserFromGroup` request. The structure is empty.

## `authz`

### `authz.GetPermissionsRequest`
The structure used as an argument for a `authz.GetPermissions` request. It contains the ID of the
Object the client wishes to get the permission list for. Requires the scope `OBJECTPERMISSIONS`.

| Name        | Type   | Description           |
|-------------|--------|-----------------------|
| `object_id` | string | The object identifier |

### `authz.GetPermissionsResponse`
The structure returned by a `storage.GetPermissions` request. It contains a list of group IDs of
groups with access to the Object specified in the request.

| Name        | Type     | Description           |
|-------------|----------|-----------------------|
| `group_ids` | []string | An array of group IDs |

### `authz.AddPermissionRequest`
The structure used as an argument for an `authz.AddPermission` request. It contains the ID of an
Object and a target group ID. The specified group ID will be added to the access list of the
specified object. Requires the scope `OBJECTPERMISSIONS`.

| Name        | Type   | Description                       |
|-------------|--------|-----------------------------------|
| `object_id` | string | The object                        |
| `target`    | string | The target for permission change  |

### `authz.AddPermissionResponse`
The structure returned by a `authz.AddPermission` request. The structure is empty.

### `authz.RemovePermissionRequest`
The structure used as an argument for a `authz.RemovePermission` request. It contains the ID of an
Object and a target group ID. The specified group ID will be removed from the access list of the
specified object. Requires the scope `OBJECTPERMISSIONS`.

| Name        | Type   | Description                           |
|-------------|--------|---------------------------------------|
| `object_id` | string | The object                            |
| `target`    | string | The target UID for permission change  |

### `authz.RemovePermissionResponse`
The structure returned by a `authz.RemovePermission` request. The structure is empty.