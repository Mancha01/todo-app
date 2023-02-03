import { Box, Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../state/actions/actionCreators";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddTodo = () => {
  const initialTodoState = {
    id: null,
    title: "",
    description: "",
    isDone: false,
  };

  const [todo, setTodo] = useState(initialTodoState);
  const [submitted, setSubmitted] = useState(false);

  const { title, description } = todo;

  const initialValues = {
    title,
    description,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, "Minimum length of title is 5 characters")
      .max(35, "Maximum length of title is 35 characters")
      .required("Title is required"),
    description: Yup.string()
      .min(5, "Minimum length of title is 5 characters")
      .max(35, "Maximum length of title is 35 characters")
      .required("Description is required"),
  });

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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={saveTutorial}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <Box>
                <TextField
                  label="title"
                  variant="outlined"
                  fullWidth
                  id="title"
                  value={todo.title}
                  onChange={handleInputChange}
                  name="title"
                  type="text"
                />

                <ErrorMessage name="title" component="div" />
              </Box>
              <Box sx={{ marginTop: "25px", marginBottom: "25px" }}>
                <TextField
                  label="description"
                  variant="outlined"
                  fullWidth
                  id="description"
                  value={todo.description}
                  onChange={handleInputChange}
                  name="description"
                  type="text"
                />
                <ErrorMessage name="description" component="div" />
              </Box>
              <Button variant="contained" disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddTodo;
