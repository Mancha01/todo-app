import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Create from "./components/AddTodo";
import Home from "./components/Home";
import EditTodo from "./components/EditTodo";

const App = () => {
  return (
    <>
      <AppBar position="static" sx={{ paddingX: "10vw" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h3"
              component="div"
              sx={{ color: "whitesmoke" }}
            >
              Todos
            </Typography>
          </a>

          <Link to={"/add"} style={{ textDecoration: "none" }}>
            <Typography variant="h5" color={"whitesmoke"}>
              Add
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: "10vh" }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add" element={<Create />} />
          <Route exact path="/todos/:id" element={<EditTodo />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
