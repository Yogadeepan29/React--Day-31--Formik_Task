import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CSS/CreateBook.css";
import { useNavigate } from "react-router-dom";

// Define the schema for book data using Yup
const bookSchema = Yup.object().shape({
  title: Yup.string().required("Book title is Required"),
  author: Yup.string().required("Author Name is Required"),
  // ISBN number is required and must be 13 digits
  isbn: Yup.string()
    .required("ISBN number is Required")
    .test("isbn", "ISBN must be 13 digits", (value) => {
      const isbnRegex = /^\d{13}$/;
      return isbnRegex.test(value);
    }),
  date: Yup.date().required("Publication date is Required"),
  cover: Yup.string().required("Cover Image Url is Requried"),
});
const CreateBook = () => {
  const navigate = useNavigate();
  return (
    <div className="create-book">
      <h1 className="text-center">Create New Book</h1>
      <Formik
        initialValues={{ title: "", author: "", isbn: "", date: "", cover: "" }}
        validationSchema={bookSchema}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post(
              "https://66cf64cc901aab248422084a.mockapi.io/api/books",
              values
            )
            .then((response) => {
              setSubmitting(false);
              alert("Book created successfully!");
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
              <label>Title:</label>
              <Field type="text" name="title" className="form-control" />
              <ErrorMessage
                name="title"
                component="div"
                className="text-danger "
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <Field type="text" name="author" className="form-control" />
              <ErrorMessage
                name="author"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label>ISBN:</label>
              <Field type="text" name="isbn" className="form-control" />
              <ErrorMessage
                name="isbn"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label>Publication Date:</label>
              <Field type="date" name="date" className="form-control" />
              <ErrorMessage
                name="date"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label>Cover Image URL:</label>
              <Field type="url" name="cover" className="form-control" />
              <ErrorMessage
                name="cover"
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
                Create Book
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBook;
