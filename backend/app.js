const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(cors());
const port = 3001;

// IRL you would use a database to store your data
// Lets pretend this is a database for this example
// Any todo items will reset if we stop the app bc we're not using a real DB
const todoItems = ["Finish project", "Ace final assessment"];

// Get all todo items from the database and return them to the user
app.get("/todo", (req, res) => {
  console.log("Fetching all todos from the database");
  res.json(todoItems);
});

// Add a todo item to the database
// Return code 201 (CREATED) on success
// We will expect the user to send us JSON in the format:
//   {
//     "todoItem": "learn about APIs"
//   }
// if they don't send it in that format we'll send them an error code
app.post("/todo", (req, res) => {
  const requestBody = req.body;
  const newTodoItem = requestBody?.todoItem;

  // if todoItem is missing in the request body
  if (!newTodoItem) {
    console.error("user sent invalid data");
    // HTTP Status Code 400 - Bad Request
    // Use this when the user has made an invalid request and send them a helpful error message
    res
      .status(400)
      .json({ message: "required field todoItem not found", errorCode: 400 });
    return;
  }

  console.log(`Saving new Todo item: ${newTodoItem}`);

  // todoItem must be present
  // save it to the database
  todoItems.push(newTodoItem);

  // send success code to the user to let them know the item has been saved
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
