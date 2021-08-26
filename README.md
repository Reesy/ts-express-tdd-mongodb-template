# ts-express-tdd-mongodb-template
A template backend typescript project using REST with express and supertest for TDD

This project comes preset for vscode, the included ```.vscode/launch.json``` allows for running of the app with debugging as well as running of mocha tests with debugging. 

Commands:

Install: (requires node and npm)
``` npm install ```

Build: 
``` npm run build ```

Start:
``` npm run start ```

Test:
``` npm run test ```

Any tests added to the test folder will automatically be tested. 

List of example requests:


---
GET example ```/api/v1/test1``` request:
```
GET /api/v1/test1 HTTP/1.1
{
    "message": "Hello!!"
}
```

Example response:
```
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: text/html; charset=utf-8
Content-Length: xy

"Hello World!" 
```

---
Example ```/api/v1/test1``` request:
```
POST /api/v1/test1 HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy

{
    "message": "Hello!!"
}
```
Example response:
```
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: text/html; charset=utf-8
Content-Length: xy

"The body was: Hello!!" 

```
---
