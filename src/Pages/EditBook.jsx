import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./CSS/EditBook.css";

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

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    date: "",
    cover: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://66cf64cc901aab248422084a.mockapi.io/api/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="edit-book">
      <h1>Edit Book</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Formik
          initialValues={{
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            date: book.date,
            cover: book.cover,
          }}
          validationSchema={bookSchema}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .put(
                `https://66cf64cc901aab248422084a.mockapi.io/api/books/${id}`,
                values
              )
              .then(() => {
                setSubmitting(false);
                alert("Book updated successfully!");
                navigate("/manage-books");
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
                  className="text-danger"
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
                  Update Book
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default EditBook;
