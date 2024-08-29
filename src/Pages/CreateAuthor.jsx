// Import necessary dependencies from React, Formik, and Yup
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CSS/CreateAuthor.css";
import { useNavigate } from "react-router-dom";

// Define the schema for author data using Yup
const authorSchema = Yup.object().shape({
  name: Yup.string().required("Author name is Required"),
  dob: Yup.date().required("Author DOB is Required"),
  biography: Yup.string().required("A short Biography is Required"),
});

const CreateAuthor = () => {
  const navigate = useNavigate();
  return (
    <div className="create-author ">
      <h1 className="text-center">Create New Author</h1>
      <Formik
        // Initialize form values
        initialValues={{ name: "", dob: "", biography: "" }}
        // Validate form data using the authorSchema
        validationSchema={authorSchema}
        // Handle form submission
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post(
              "https://66cf64cc901aab248422084a.mockapi.io/api/authors",
              values
            )
            .then((response) => {
              setSubmitting(false);
              alert("Author created successfully!");
              navigate("/");
            })
            .catch((error) => {
              setSubmitting(false);
              console.error(error);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label>Name:</label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label>Birth Date:</label>
              <Field type="date" name="dob" className="form-control" />
              <ErrorMessage
                name="dob"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label>Biography:</label>
              <Field
                type="textarea"
                name="biography"
                className="form-control"
              />
              <ErrorMessage
                name="biography"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Create Author
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateAuthor;
