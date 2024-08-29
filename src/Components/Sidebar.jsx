// Import necessary dependencies from React and React Router
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();

  // Use the useEffect hook to update the active item when the location changes
  useEffect(() => {
    // Remove the leading '/' from the pathname to get the current item
    const currentItem = location.pathname.replace("/", "");
    // Update the active item state
    setActiveItem(currentItem);
  }, [location]); // Re-run the effect when the location changes

  return (
    <div className="sidebar">
      <ul className="nav flex-column">
        {/* Dashboard link */}
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link ${activeItem === "" ? "active" : ""}`}
            data-bs-toggle="popover"
            data-bs-content="Dashboard"
          >
            <i className="fas fa-dashboard"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        {/* Manage Books link */}
        <li className="nav-item">
          <Link
            to="/manage-books"
            className={`nav-link ${
              activeItem === "manage-books" ? "active" : ""
            }`}
            data-bs-toggle="popover"
            data-bs-content="Manage Books"
          >
            <i className="fas fa-book"></i>
            <span>Manage Books</span>
          </Link>
        </li>
        {/* Manage Authors link */}
        <li className="nav-item">
          <Link
            to="/manage-authors"
            className={`nav-link ${
              activeItem === "manage-authors" ? "active" : ""
            }`}
            data-bs-toggle="popover"
            data-bs-content="Manage Authors"
          >
            <i className="fas fa-user"></i>
            <span>Manage Authors</span>
          </Link>
        </li>
        {/* Create New Book link */}
        <li className="nav-item">
          <Link
            to="/create-book"
            className={`nav-link ${
              activeItem === "create-book" ? "active" : ""
            }`}
            data-bs-toggle="popover"
            data-bs-content="Create New Book"
          >
            <i className="fas fa-plus"></i>
            <span>Create New Book</span>
          </Link>
        </li>
        {/* Create New Author link */}
        <li className="nav-item">
          <Link
            to="/create-author"
            className={`nav-link ${
              activeItem === "create-author" ? "active" : ""
            }`}
            data-bs-toggle="popover"
            data-bs-content="Create New Author"
          >
            <i className="fas fa-plus"></i>
            <span>Create New Author</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
