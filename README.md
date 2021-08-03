## Online Store API.

<p align= "justify">
API that allows to make next operations.

1. Sign Up
2. Sign In
3. Create Order.
4. Product Report.

***

## Requirements

```sh
# check version Doker installation
$ docker -v
Docker version 20.10.2, build 2291f61
```
```sh
# check docker-compose installation
$ docker-compose -v
docker-compose version 1.27.4, build 40524192
```
***
## Install & Run

```sh
# Open a terminal
```
```sh
#Clone repository
$ git clone git@github.com:yexhoo/online-store.git
```
```sh
# Create containers.
$ cd online-store 
$ make install

# Output

online-store-database | 2021-08-03 01:07:14.462 UTC [48] LOG:  shutting down
online-store-database | 2021-08-03 01:07:14.494 UTC [46] LOG:  database system is shut down
online-store-database |  done
online-store-database | server stopped
online-store-database | 
online-store-database | PostgreSQL init process complete; ready for start up.
online-store-database | 
online-store-database | 2021-08-03 01:07:14.589 UTC [1] LOG:  starting PostgreSQL 13.3 (Debian 13.3-1.pgdg100+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 8.3.0-6) 8.3.0, 64-bit
online-store-database | 2021-08-03 01:07:14.589 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
online-store-database | 2021-08-03 01:07:14.589 UTC [1] LOG:  listening on IPv6 address "::", port 5432
online-store-database | 2021-08-03 01:07:14.594 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
online-store-database | 2021-08-03 01:07:14.600 UTC [74] LOG:  database system was shut down at 2021-08-03 01:07:14 UTC
online-store-database | 2021-08-03 01:07:14.605 UTC [1] LOG:  database system is ready to accept connections
online-store-api | 
online-store-api | > online-store-api@1.0.0 dev /app
online-store-api | > nodemon src/app.js 
online-store-api | 
online-store-api | [nodemon] 2.0.2
online-store-api | [nodemon] to restart at any time, enter `rs`
online-store-api | [nodemon] watching dir(s): *.*
online-store-api | [nodemon] watching extensions: js,mjs,json
online-store-api | [nodemon] starting `node src/app.js`
online-store-api | Online Store API is running on port 3000

```
***
## Run Unit Tests.

```sh

# Run tests
$ make test

# Output
> online-store-api@1.0.0 test /josh/online-store
> NODE_PATH=./src jest --silent

 PASS  src/database/models/__tests__/index.test.js
 PASS  src/constant/index.test.js
 PASS  src/database/utils/logger/index.test.js
 PASS  src/identity/index.test.js
-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------|---------|----------|---------|---------|-------------------
All files  |     100 |      100 |     100 |     100 |                   
 constant  |     100 |      100 |     100 |     100 |                   
  index.js |     100 |      100 |     100 |     100 |                   
 identity  |     100 |      100 |     100 |     100 |                   
  index.js |     100 |      100 |     100 |     100 |                   
-----------|---------|----------|---------|---------|-------------------

Test Suites: 4 passed, 4 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        2.174 s
```
***
## Migrations

```sh
# You need to run migrations to create Database/Tables
$ make migrate
```

***
## Sign Up

### Description: `Allows to create new user`
### URL: `http://localhost:3000/v1/auth/signup`
### Content-Type: `application/json`
### Method: `POST`
### Success Response: `201 Created`
### Error Response: `400 Bad Request`

```sh
# CURL
curl --write-out "\n status code: %{http_code} " --location --request POST 'http://localhost:3000/v1/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '
{
	"user": {
		"email": "josue.nolasco@gmail.com",
		"name": "Josue Nolasco Miranda"
	}
}'
```

```sh
# Success Request
{
    "user": {
        "email": "josue.nolasco@gmail.com",
        "name": "Josue Nolasco Miranda"
    }
}

# Success Response
{
    "user": {
        "id":"fb80bb84-dbe5-47b2-9dc3-589be7ef5dcc",
        "email":"josue.nolasco@gmail.com",
        "name":"Josue Nolasco Miranda",
        "createdAt":"2021-08-03T03:32:38.736Z",
        "updatedAt":"2021-08-03T03:32:38.736Z"
    }
}
```


***
## Sign In

### Description: `Allows to obtain a token for a valid user`
### URL: `http://localhost:3000/v1/auth/signin`
### Content-Type: `application/json`
### Method: `POST`
### Success Response: `200 Ok`
### Error Response: `400 Bad Request`

```sh
# CURL
curl --write-out "\n status code: %{http_code} " --location --request POST 'http://localhost:3000/v1/auth/signin' \
--header 'Content-Type: application/json' \
--data-raw '
{
	"user": {
		"email": "josue.nolasco@gmail.com"
	}
}'
```

```sh
# Success Request
{
	"user": {
		"email": "josue.nolasco@gmail.com"
	}
}

# Success Response
{ "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"}
```

```sh
# Fail Request
{
	"user": {
		"email": "some@domain.com"
	}
}

# Fail Response
{ "error" : "some@domain.com invalid user." }
```

***
## Create Order

### Description: `Allows to create new order`
### URL: `http://localhost:3000/v1/order`
### Content-Type: `application/json`
### Method: `POST`
### Success Response: `201 Created`
### Error Response: `400 Bad Request`
### Require: `Authorization Bearer obtained at signin endpoint`

```sh
# CURL
curl --write-out "\n status code: %{http_code} " --location --request POST 'http://localhost:3000/v1/order' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impvc3VlLm5vbGFzY29AZ21haWwuY29tIiwiaWF0IjoxNjI3OTYyNTUwLCJleHAiOjE2Mjc5Njk3NTB9.gyGaJtX2xlzSA55owurXXSq1QmhRld9xIYEHCEEqW9g' \
--data-raw '
{
	"order": {
		"name": "Cliente 1",
		"price": 200,
		"products": [
			{
				"name": "Producto 6",
				"price": 100,
				"quantity": 1
			},
			{
				"name": "producto 6",
				"price": 100,
				"quantity": 1
			}
		]
	}
}'
```

```sh
# Success Request
{
	"order": {
		"name": "Cliente 1",
		"price": 200,
		"products": [
			{
				"name": "Producto 1",
				"price": 100,
				"quantity": 1
			},
			{
				"name": "producto 2",
				"price": 100,
				"quantity": 1
			}
		]
	}
}

# Success Response
{
    "order":{
        "id":"45766076-86d7-4a69-b7f7-2f4a3e82bf68",
        "name":"Cliente 1",
        "price":"200.00",
        "userId":"fb80bb84-dbe5-47b2-9dc3-589be7ef5dcc",
        "createdAt":"2021-08-03T03:49:30.271Z",
        "updatedAt":"2021-08-03T03:49:30.271Z"
    }
}
```

```sh
# Fail Request
For an invalid Authorization Bearer.


# Fail Response
{ "error" : "Invalid user" }
```

***
## Product Report
### Description: `Allows to obtain product report`
### URL: `http://localhost:3000/v1/product`

### Method: `GET`
### Query params:
	- init: Initial date
	- end: End date
### Success Response: `200 OK`


```sh
# CURL
curl --location --request GET 'http://localhost:3000/v1/product?init=2021-08-02&end=2021-08-02'
```

```sh
# Success Response
{
    "products":[
        {"name":"producto 1","quantity":"5","price":"500.00"},
        {"name":"Producto 2","quantity":"1","price":"100.00"}
    ]
}
```




