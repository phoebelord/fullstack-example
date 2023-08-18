# Backend

Simple ExpressJS API  
Keeps track of a list of ToDos (no DB to keep it simple)

Install with `npm install`  
Run with `node app.js`

When it's running, you can test it using cURL  
`$ curl localhost:3001/todo` - (GET) get the current todo list  
`$ curl -X POST localhost:3001/todo -d @todo.json -H 'Content-Type: application/json` - (POST) add a new item to the list.
The JSON that is sent is in todo.json.

Postman is another great tool for testing APIs.
