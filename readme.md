# Photo Library API

## Location

The API is available at https://photo-library-api.herokuapp.com. Responses are sent as JSON.

## HTTP Verbs

The Photo Library API uses HTTP verbs appropriate to each action.

| Verb     | Description           |
| -------- |-----------------------|
| `GET`    | Retrieving resources. |
| `POST`   | Creating resources.   |
| `PUT`    | Updating resources.   |
| `DELETE` | Deleting resources.   |

## Endpoints

| Endpoint   | Description                             |
| ---------- |---------------------------------------- |
| `/albums`  | Handle albums. Authentication required. |
| `/photos`  | Handle photos. Authentication required. |
| `/login`   | Login and Authentication.               |
| `/register`| Register a new user.                    |
| `/refresh` | Refresh access token.                   |

## `/photos`

### List photos

Retrieve a list of all photos belonging to the logged-in user. *(authentication required)*

```json
GET /photos
```

#### Parameters

None.

***

### Get a photo

Retrieve a single photo by ID. *(authentication required)*

```json
GET /photos/:photoId
```

#### Parameters

| Param     | Type      | Description                |
| --------- | --------- | -------------------------- |
| `photoId` | `integer` | The photo’s ID. `Required` |

***

### Create a photo

Create a new photo. *(authentication required)*

```json
POST /photos
```

#### Parameters

| Param     | Type     | Description                              |
| --------- |----------| ---------------------------------------- |
| `title`   | `string` | The title of the photo. `Required`       |
| `url`     | `string` | The url of the photo. `Required`         |
| `comment` | `string` | The description of the photo. `Optional` |

***

### Update a photo

Update a photo by ID.  *(authentication required)*

```json
PUT /photos/:photoId
```

#### Parameters

| Param     | Type     | Description                              |
| --------- |----------| ---------------------------------------- |
| `photoId` | `integer`| The photo’s ID. `Required`               |
| `title`   | `string` | The title of the photo. `Optional`       |
| `url`     | `string` | The url of the photo. `Optional`         |
| `comment` | `string` | The description of the photo. `Optional` |

***

### Delete a photo

Delete a photo by ID. *(authentication required)*

```json
DELETE /photos/:photoId
```

#### Parameters

| Param     | Type     | Description                |
| --------- |----------| -------------------------- |
| `photoId` | `integer`| The photo’s ID. `Required` |

***

## `/albums`

### List albums

Retrieve a list of all albums belonging to the logged-in user. *(authentication required)*

```json
GET /albums
```

#### Parameters

None.

***

### Get an album

Retrieve a single album by ID. *(authentication required)*

```json
GET /albums/:albumId
```

#### Parameters

| Param     | Type      | Description                |
| --------- | --------- | -------------------------- |
| `albumId` | `integer` | The album’s ID. `Required`|

***

### Create an album

Create a new album. *(authentication required)*

```json
POST /albums/:albumId
```

#### Parameters

| Param     | Type     | Description                        |
| --------- |----------| ---------------------------------- |
| `title`   | `string` | The title of the album. `Required` |

***

### Update an album

Update an album by ID. *(authentication required)*

```json
PUT /albums/:albumId
```

#### Parameters

| Param     | Type     | Description                        |
| --------- |----------| ---------------------------------- |
| `albumId` | `integer`| The album’s ID. `Required`         |
| `title`   | `string` | The title of the album. `Optional` |

***

### Delete an album

Delete an album by ID. *(authentication required)*

```json
DELETE /albums/:albumId
```

#### Parameters

| Param     | Type     | Description                |
| --------- |----------| -------------------------- |
| `albumId` | `integer`| The album’s ID. `Required` |

***

### Add photo to album

Add photo(s) to a specific album. *(authentication required)*

```json
POST /albums/:albumId/photos
```

#### Parameters

| Param     | Type                 | Description                                     |
| --------- |--------------------- | ----------------------------------------------- |
| `albumId` | `integer`            | The album’s ID. `Required`                      |
| `photo_id`| `integer` or `array` | The photo’s ID (single or multiple). `Required` |

***

### Remove photo from album

Remove photo(s) from a specific album. *(authentication required)*

```json
DELETE /albums/:albumId/photos
```

#### Parameters

| Param     | Type                 | Description                                     |
| --------- |--------------------- | ----------------------------------------------- |
| `albumId` | `integer`            | The album’s ID. `Required`                      |
| `photo_id`| `integer` or `array` | The photo’s ID (single or multiple). `Required` |

***

## `/login`

### Login and Authentication

Login to retrieve access token.

```json
POST /login
```

#### Parameters

| Param      | Type     | Description                                |
| ---------- |--------- | ------------------------------------------ |
| `email`    | `string` | The registered user's email. `Required`    |
| `password` | `string` | The registered user's password. `Required` |

#### Response

If successful, the response body will be a JSON representation of the access and refresh token:

```json
{
    "status": "success",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJlbWFpbCI6InNv",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJlbWFpbCI6InNv"
    }
}
```

On future requests, send access token via the HTTP Authorization header:

```json
Authorization: Bearer ACCESS_TOKEN
```

***

## `/refresh`

### Refresh access token

Use refresh token to retrieve a new access token.

```json
POST /refresh

Authorization: Bearer REFRESH_TOKEN
```

***

## `/register`

### Register new user

Register a new user.

```json
POST /register
```

#### Parameters

| Param        | Type     | Description                           |
| ------------ |--------- | ------------------------------------- |
| `email`      | `string` | The new user's email. `Required`      |
| `password`   | `string` | The new user's password. `Required`   |
| `first_name` | `string` | The new user's first name. `Required` |
| `last_name`  | `string` | The new user's last name. `Required`  |
