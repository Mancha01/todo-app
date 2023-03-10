import React, { useState, useEffect } from "react";
import { Box, Button, Checkbox, Container, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import "moment-timezone";
import { HourGlass } from "react-awesome-spinners";

import {
  deleteTodo,
  retrieveTodos,
  findTodosByTitle,
} from "../state/actions/actionCreators";

import swal from "sweetalert";
import useLocalStorage from "../useLocalStorage";
import TodoCard from "./TodoCard";

const Home = () => {
  const [todos, setTodos] = useLocalStorage("theTodos", []);
  const [searchTitle, setSearchTitle] = useState("");
  const todosData = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  //const [isOnline, setIsOnline] = useState(navigator.onLine);

  const onChangeSearchTitle = (e) => {
    const searchQueryTitle = e.target.value;
    setSearchTitle(searchQueryTitle);
  };

  const findByTitle = () => {
    dispatch(findTodosByTitle(searchTitle));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      findByTitle();
    }
  };
  const removeTutorial = (id) => {
    dispatch(deleteTodo(id))
      .then(() => {
        console.log("deleted successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    dispatch(retrieveTodos());
  }, []);

  useEffect(() => {
    setTodos(todosData);
  }, [todosData]);

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        removeTutorial(id);
        swal("Poof! Your file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your file is safe!");
      }
    });
  };

  return (
    <Container>
      {/*loading state*/}
      {todos.length === 0 && <HourGlass />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
          alignItems: "center",
        }}
      >
        <TextField
          id="filled-basic"
          variant="filled"
          sx={{ width: "50vw" }}
          placeholder="Search By Title"
          onChange={onChangeSearchTitle}
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={findByTitle}
          sx={{ height: "55.5px", right: "2px", bottom: "0.3px" }}
          variant="outlined"
        >
          Search
        </Button>
      </Box>

      <Box>
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            date={<Moment>{todo.createdAt}</Moment>}
            description={todo.description}
            title={todo.title}
            link={`/todos/${todo.id}`}
            del={() => handleDelete(todo.id)}
            check={
              todo.isDone ? <Checkbox checked sx={{ cursor: "none" }} /> : ""
            }
          />
        ))}
      </Box>
    </Container>
  );
};
//fsdsd
export default Home;
