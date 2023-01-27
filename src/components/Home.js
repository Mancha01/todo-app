import React, { useState, useEffect } from "react";
import { Box, Checkbox, Container, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import DayJS from "react-dayjs";

import { deleteTodo, retrieveTodos } from "../state/actions/actionCreators";
import TodoCard from "./TodoCard";

const Home = () => {
  const [isChecked, setIsChecked] = useState(false);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  console.log(todos);

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

  return (
    <Container>
      <Box>
        {todos &&
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              date={<Moment>{todo.createdAt}</Moment>}
              description={todo.description}
              title={todo.title}
              link={"/todos/" + todo.id}
              del={() => removeTutorial(todo.id)}
              check={todo.isDone ? <Checkbox checked /> : ""}
            />
          ))}
      </Box>
    </Container>
  );
};
//fsdsd
export default Home;
