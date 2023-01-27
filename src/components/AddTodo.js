import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../state/actions/actionCreators";

const AddTodo = () => {
  const initialTodoState = {
    id: null,
    title: "",
    description: "",
    isDone: false,
  };

  const [todo, setTodo] = useState(initialTodoState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTodo({ ...todo, [name]: value });
  };

  const saveTutorial = () => {
    const { title, description } = todo;
    dispatch(createTodo(title, description))
      .then((data) => {
        setTodo({
          id: data.id,
          title: data.title,
          description: data.description,
          isDone: data.isDone,
        });

        setSubmitted(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTodo = () => {
    setTodo(initialTodoState);
    setSubmitted(false);
  };

  return (
    <Container>
      {submitted ? (
        <Box sx={{ marginTop: "50px" }}>
          <Typography variant="h5" sx={{ marginBottom: "50px" }}>
            You submitted successfully!
          </Typography>
          <Button variant="contained" onClick={newTodo}>
            Add
          </Button>
        </Box>
      ) : (
        <Box>
          <Box>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              required
              id="title"
              value={todo.title}
              onChange={handleInputChange}
              name="title"
              inputProps={{ maxLength: 35 }}
            />
          </Box>
          <Box sx={{ marginTop: "25px", marginBottom: "25px" }}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              required
              id="description"
              value={todo.description}
              onChange={handleInputChange}
              name="description"
              inputProps={{ maxLength: 50 }}
            />
          </Box>
          <Button variant="contained" onClick={saveTutorial} type="submit">
            Submit
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default AddTodo;
