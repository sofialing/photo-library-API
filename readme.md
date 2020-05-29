# Photo Library API

## Endpoints

## `/photos`

### `GET /photos`

Get all photos.

### `GET /photos/:photoId`

Get a photo by ID.

### `POST /photos`

Create a new photo.

### `PUT /photos/:photoId`

Update a photo by ID.

### `DELETE /photos/:photoId`

Delete a photo by ID.

## `/albums`

### `GET /albums`

Get all albums.

### `GET /albums/:albumId`

Get a album by ID.

### `POST /albums`

Create a new album.

### `PUT /albums/:albumId`

Update an album by ID.

### `DELETE /albums/:albumId`

Delete an album by ID.

### `POST /albums/:albumId/photos`

Add photo(s) to album.

### `DELETE /albums/:albumId/post`

Remove photo(s) from album.

## `/login`

### `POST /login`

Login and get access-token.

## `/refresh`

### `POST /refresh`

Refresh access-token.

## `/register`

### `POST /register`

Create a new user.
