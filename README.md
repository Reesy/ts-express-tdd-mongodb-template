# ts-express-tdd-mongodb-template
A back-end typescript template project using REST with express and supertest for TDD. It has CI/CD support through Jenkins and Docker. 

This example just inserts, removes and reads a user and their associated email address from mongo and returns it in the REST API.

This project comes preset for vscode, the included ```.vscode/launch.json``` allows for running of the app with debugging as well as running of mocha tests with debugging. 

The program has a configuration class that will try to read properties from a .env file, specifically

```
MONGO_ROOT_USER = ****
MONGO_ROOT_PASSWORD = ****
MONGO_PORT = 27017
MONGO_HOST = localhost
```

Any of these settings set in the environment will take precedence over a .env file entry

## Commands:

Install: (requires node and npm)
``` npm install ```

Build: 
``` npm run build ```

Start:
``` npm run start ```

Test:
``` npm run test ```

Spinng up a mongo instance (requires docker and docker-compose installed): 
``` docker-compose up ``` 

Any tests added to the test folder will automatically be tested. 

## Requests

### POST ```/api/v1/user``` 

Example request:
```
POST /api/v1/user HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy

{
    "name": "John Doe",
    "email": "JohnDoe@emailProvider.com"
}
```
Example response:
```
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json; charset=utf-8
Content-Length: xy

"Added user John Doe to the database" 

```

### GET ```/api/v1/users``` 
Eample request:
```
GET /api/v1/users HTTP/1.1
```

Example response:
```
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json; charset=utf-8
Content-Length: xy

[
  {
    "name": "John Doe",
    "email": "JohnDoe@emailProvider.com"
  },
  {
    "name": "Tim Smith",
    "email": "TimSmith@OtherEmailProvider.jp"
]
```
## Todo: 
- [x]  Create
- [x]  Read
- [ ]  Wire up removable/delete to the API 

