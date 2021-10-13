This project has four API endpoints; `api/login`, `api/scores`, `api/username` and `api/users`.

### `api/login`

Accepts only `POST` requests and needs a username and password on the body.

Example return when `statusCode = 200` (login successful):

```json
{
  "accessToken": "gtwoierjkvdscvty6789a3y424rbklfh78a0...",
  "user": {
    "username": "John",
    "picture": "https://media3.giphy.com/media/eHRwLGsS6QDViZhp2P/giphy.gif...",
    "picture_alt": "Warner Bros Dancing GIF by Joker Movie"
  }
}
```

### `api/scores`

Accepts `POST` and `GET` requests. `POST` needs a username and score on the body as well as an Authorization header with
an access token.

Example return when `POST` and `statusCode = 201` (score update successful):

```json
{
  "username": "John"
}
```

Example return when `POST` and `statusCode = 401` (no access token):

```json
"Unauthorized"
```

Example return when `POST` and `statusCode = 403` (access token not valid):

```json
"Forbidden"
```

Example return when `GET` and `statusCode = 200`:

```json
[
  {
    "username": "John",
    "score": 37,
    "picture": "https://media4.giphy.com/media/bbshzgyFQDqPHXBo4c/giphy.gif...",
    "picture_alt": "Dog Morning GIF"
  },
  {
    "username": "Pekka",
    "score": 89,
    "picture": "https://media1.giphy.com/media/J4yn9XYLIRNzQLwHqI/giphy.gif...",
    "picture_alt": "Season 3 What GIF by On My Block"
  }
]
```

### `api/username`

Accepts only `POST` requests and needs a username on the body.

Example return when `statusCode = 201` (username not taken):

```json
{
  "username": "John"
}
```

Example return when `statusCode = 400` (username taken):

```json
"Username already taken"
```

### `api/users`

Accepts `POST` and `GET` requests. `POST` needs a username and score on the body.

Example return when `POST` and `statusCode = 201` (registration was successful):

```json
{
  "username": "John"
}
```

Example return when `GET` and `statusCode = 200`:

```json
[
  {
    "ID": 1,
    "username": "John",
    "password": "123GH867FDSGFVIAUGH78XVCsdf...",
    "country": "Finland",
    "create_time": "2021-10-04T15:24:01.000Z",
    "first_name": "John",
    "last_name": "Doe",
    "picture": "https://media4.giphy.com/media/bbshzgyFQDqPHXBo4c/giphy.gif...",
    "picture_alt": "Dog Morning GIF"
  },
  {
    "ID": 2,
    "username": "Pekka",
    "password": "bjhsd56978E31FdfsDBRLJGBFE78...",
    "country": "Germany",
    "create_time": "2021-10-04T18:14:45.000Z",
    "first_name": "Pekka",
    "last_name": "Schneidermann",
    "picture": "https://media1.giphy.com/media/l4KibWpBGWchSqCRy/giphy.gif...",
    "picture_alt": "Very Funny Oops GIF by America's Funniest Home Videos"
  }
]
```

### Applies to all

If something goes wrong, the endpoint always returns the following with a `statusCode = 500`:

```json
{
  "info": {
    "message": "An error occurred while connecting to the database"
  }
}
```

Or if the Method was not accepted `statusCode = 405`:

```json
"Method PUT Not Allowed"
```