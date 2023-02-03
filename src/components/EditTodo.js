import {
  Box,
  Button,
  Checkbox,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { updateTodo } from "../state/actions/actionCreators";
import TodoService from "../state/services/TodoService";

const EditTodo = (props) => {
  const initialTodoState = {
    id: null,
    title: "",
    description: "",
    isDone: false,
  };

  const [currentTodo, setCurrentTodo] = useState(initialTodoState);

  let isChecked = currentTodo.isDone ? "checked" : "";

  console.log(isChecked);

  const dispatch = useDispatch();
  const todoId = useParams();
  const navigate = useNavigate();

  const getTutorial = (id) => {
    TodoService.get(id)
      .then((res) => {
        setCurrentTodo(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(todoId.id);
  }, [todoId.id]);

  const updateStatus = () => {
    const data = {
      id: currentTodo.id,
      title: currentTodo.title,
      description: currentTodo.description,
      isDone: !currentTodo.isDone,
    };

    dispatch(updateTodo(currentTodo.id, data))
      .then((res) => {
        console.log(res);

        setCurrentTodo({ ...currentTodo, isDone: data.isDone });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCurrentTodo({ ...currentTodo, [name]: value });
  };

  const updateContent = () => {
    dispatch(updateTodo(currentTodo.id, currentTodo))
      .then((res) => {
        console.log(res);

        swal("Status", "The todo was updated successfully", "success");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <Box>
        <Box>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            required
            id="title"
            value={currentTodo.title}
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
            value={currentTodo.description}
            onChange={handleInputChange}
            name="description"
            inputProps={{ maxLength: 50 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <Typography variant="h5" sx={{ marginRight: "20px" }}>
            Status:
          </Typography>
          {currentTodo.isDone ? "done" : "incomplete"}
          <Checkbox isChecked onClick={() => updateStatus()} />
        </Box>
        <Button variant="contained" onClick={updateContent}>
          Update
        </Button>
      </Box>
    </Container>
  );
};

export default EditTodo;
