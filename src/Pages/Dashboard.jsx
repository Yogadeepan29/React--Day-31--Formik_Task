import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Initialize state variables for books and authors
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  // Use the useEffect hook to fetch data from the API when the component mounts
  useEffect(() => {
    // Fetch books data
    axios
      .get("https://66cf64cc901aab248422084a.mockapi.io/api/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch authors data
    axios
      .get("https://66cf64cc901aab248422084a.mockapi.io/api/authors")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Define a function to format dates
  const formatDate = (date) => {
    const year = date.getFullYear();
    return `${year}`;
  };

  return (
    <div
      className="dashboard"
      style={{ paddingRight: "20px", paddingTop: "50px" }}
    >
      <div className="row">
        <div className="col-md-6 mb-4">
          <div
            className="card widget bg-dark text-white text-center"
            onClick={() => navigate("/manage-authors")}
          >
            <div className="card-body">
              <h5 className="card-title fs-3">Total Authors</h5>
              <p className="card-text fs-2">{authors.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div
            className="card widget bg-dark text-white text-center"
            onClick={() => navigate("/manage-books")}
          >
            <div className="card-body">
              <h5 className="card-title fs-3">Total Books</h5>
              <p className="card-text fs-2">{books.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <h1 className="text-center mb-4">Books</h1>
          <div className="row">
            {books.map((book) => (
              <div
                key={book.id}
                className="col-12 col-xl-3 col-md-4 col-sm-6 col-6 mb-4"
              >
                <div className="card shadow-sm position-relative h-100">
                  <img
                    src={book.cover}
                    className="card-img-top img-fluid"
                    alt={book.title}
                    style={{ objectFit: "cover", height: "300px" }}
                    onError={(e) => {
                      e.target.src =
                        "https://i.pinimg.com/564x/68/57/09/685709a8b2632bef579219d54469f358.jpg";
                    }}
                  />
                  <div className="card-body text-center">
                    <h4 className="card-title ">{book.title}</h4>
                    <div className="mb-2">
                      <span className="fw-bold">Author : </span>
                      <span>{book.author}</span>
                    </div>
                    <div className="mb-2">
                      <span className="fw-bold">Published Year : </span>
                      <span>{formatDate(new Date(book.date))}</span>
                    </div>
                    <div className="mb-2">
                      <span className="fw-bold">ISBN : </span>
                      <span>{book.isbn}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
