// Import necessary dependencies from React and React Router
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Define the ManageAuthors component
const ManageAuthors = () => {
  // Initialize state variable for authors data
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  // Use the useEffect hook to fetch authors data from the API when the component mounts
  useEffect(() => {
    axios
      .get("https://66cf64cc901aab248422084a.mockapi.io/api/authors")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Define a function to handle author deletion
  const handleDelete = (id) => {
    axios
      .delete(`https://66cf64cc901aab248422084a.mockapi.io/api/authors/${id}`)
      .then(() => {
        setAuthors(authors.filter((author) => author.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Define a function to handle author editing
  const handleEdit = (id) => {
    navigate(`/edit-author/${id}`);
  };

  // Define a function to format dates
  const formatDate = (date) => {
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="container ms-3 " style={{ paddingTop: "50px" }}>
      <h1 className="text-center">Manage Authors</h1>
      <div className="table-responsive" style={{ overflowX: "auto" }}>
        <table className="table table-striped table-bordered table-sm">
          <thead className="thead-dark">
            <tr className="text-center">
              <th>Name</th>
              <th>Birth Date</th>
              <th>Biography</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id} className="text-center">
                <td>{author.name}</td>
                <td>{formatDate(new Date(author.dob))}</td>
                <td>{author.biography}</td>
                <td>
                  <button
                    className="btn btn-warning btn-md m-2 "
                    onClick={() => handleEdit(author.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-md m-2"
                    onClick={() => handleDelete(author.id)}
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
        <Link to="/create-author" className="btn btn-success btn-lg">
          Create New Author
        </Link>
      </div>
    </div>
  );
};

export default ManageAuthors;
