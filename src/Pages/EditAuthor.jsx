// Import necessary dependencies from React, Formik, and Yup
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./CSS/EditAuthor.css";

// Define the schema for author data using Yup
const authorSchema = Yup.object().shape({
  name: Yup.string().required("Author name is Required"),
  dob: Yup.date().required("Author DOB is Required"),
  biography: Yup.string().required("A short Biography is Required"),
});

const EditAuthor = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState({ name: "", dob: "", biography: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://66cf64cc901aab248422084a.mockapi.io/api/authors/${id}`)
      .then((response) => {
        setAuthor(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="edit-author">
      <h1>Edit Author</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Formik
          // Initialize form values with author data
          initialValues={{
            name: author.name,
            dob: author.dob,
            biography: author.biography,
          }}
          // Validate form data using the authorSchema
          validationSchema={authorSchema}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .put(
                `https://66cf64cc901aab248422084a.mockapi.io/api/authors/${id}`,
                values
              )
              .then(() => {
                setSubmitting(false);
                alert("Author updated successfully!");
                navigate("/manage-authors");
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
                  Update Author
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default EditAuthor;
