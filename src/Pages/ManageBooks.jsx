import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Define the ManageBooks component
const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Use the useEffect hook to fetch books data from the API when the component mounts
  useEffect(() => {
    axios
      .get("https://66cf64cc901aab248422084a.mockapi.io/api/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // Define a function to handle book deletion
  const handleDelete = (id) => {
    axios
      .delete(`https://66cf64cc901aab248422084a.mockapi.io/api/books/${id}`)
      .then((response) => {
        setBooks(books.filter((book) => book.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Define a function to handle book editing
  const handleEdit = (id) => {
    navigate(`/edit-book/${id}`);
  };

  // Define a function to format dates
  const formatDate = (date) => {
    const year = date.getFullYear();
    return `${year}`;
  };

  return (
    <div className="container ms-3" style={{ paddingTop: "50px" }}>
      <h1 className="text-center">Manage Books</h1>
      <div className="table-responsive" style={{ overflowX: "auto" }}>
        <table className="table table-striped table-bordered table-sm">
          <thead className="thead-dark">
            <tr className="text-center">
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Publication Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{formatDate(new Date(book.date))}</td>
                <td>
                  <button
                    className="btn btn-warning btn-md m-2 "
                    onClick={() => handleEdit(book.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-md m-2"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <Link to="/create-book" className="btn btn-success btn-lg">
          Create New Book
        </Link>
      </div>
    </div>
  );
};

export default ManageBooks;
