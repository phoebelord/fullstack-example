import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import "./App.css";

const App = () => {
  // The items we fetch from the backend - initially empty
  const [todoItems, setTodoItems] = useState([]);

  // The state of the 'newItem' text box
  const [newItem, setNewItem] = useState("");

  // If we should show the error alert or now
  const [show, setShow] = useState(false);

  const backendURL = "http://localhost:3001/todo";

  // On page load, fetch the todo items from the backend
  useEffect(() => {
    getTodoItems();
  }, []);

  // Send HTTP GET request to the backend
  const getTodoItems = async () => {
    try {
      const response = await axios.get(backendURL);
      setTodoItems(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  // Send HTTP POST request to the backend
  // Send JSON in expected format
  // Re-request the todo items from the backend
  // Hopefully our new one will be in there!
  const saveNewTodoItem = async () => {
    try {
      await axios.post(backendURL, {
        todoItem: newItem,
      });
      await getTodoItems();
    } catch (e) {
      // If an error occurs, show the alert
      setShow(true);
      console.error(e);
    }
  };

  // Save the new item and reset the text box
  const handleSubmit = (e) => {
    e.preventDefault();
    saveNewTodoItem();
    setNewItem("");
  };

  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Todo List:</h1>
        <ul>
          {/* Loop through the todoItems and create a bullet point for each one */}
          {todoItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {/* Form for creating a new todo item */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="todoItem">
            <Form.Label>Add new todo item:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Learn about APIs"
              onChange={(e) => setNewItem(e.target.value)}
              value={newItem}
            />
          </Form.Group>
          {/* Disable the button if the user hasn't entered a value */}
          <Button variant="primary" type="submit" disabled={!newItem}>
            Submit
          </Button>
        </Form>

        {/* A dismissible alert */}
        <Alert
          className="mt-3"
          variant="danger"
          show={show}
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading>Error</Alert.Heading>
          <p>A helpful error message</p>
        </Alert>
      </Container>
    </Container>
  );
};

export default App;
