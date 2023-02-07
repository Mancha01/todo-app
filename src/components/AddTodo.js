import { Box, Button, Container, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../state/actions/actionCreators";
import swal from "sweetalert";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const AddTodo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, "String must be at least 5 characters long")
      .max(35, "String must be less than 35 characters")
      .required("This field is required"),
    description: Yup.string()
      .min(10, "String must be at least 10 characters long")
      .max(50, "String must be less than 50 characters")
      .required("This field is required"),
  });

  return (
    <Container>
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(createTodo(values.title, values.description))
            .then((data) => {
              swal("Status", "The todo was added successfully", "success");

              setTimeout(() => {
                navigate("/");
              }, 1000);
              console.log(data);
            })
            .catch((e) => {
              console.log(e);
            });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Box>
              <Box>
                <Field
                  as={TextField}
                  label="Title"
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                  variant="outlined"
                  fullWidth
                  required
                  id="title"
                  name="title"
                />
              </Box>
              <Box sx={{ marginTop: "25px", marginBottom: "25px" }}>
                <Field
                  as={TextField}
                  label="Description"
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                  variant="outlined"
                  fullWidth
                  required
                  id="description"
                  name="description"
                />
              </Box>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
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
