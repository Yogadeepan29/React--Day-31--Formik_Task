// Import necessary dependencies from React and React Router
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Import components and pages
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import ManageBooks from "./Pages/ManageBooks";
import ManageAuthors from "./Pages/ManageAuthors";
import CreateBook from "./Pages/CreateBook";
import EditBook from "./Pages/EditBook";
import CreateAuthor from "./Pages/CreateAuthor";
import EditAuthor from "./Pages/EditAuthor";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Define the App component
const App = () => {
  return (
    // Wrap the app with the BrowserRouter component
    <BrowserRouter>
      {/* Render the Navbar component */}
      <Navbar />
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="col-2">
              {/* Render the Sidebar component */}
              <Sidebar />
            </div>
            <div className="col-10">
              {/* Define the routes for the app */}
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/manage-books" element={<ManageBooks />} />
                <Route path="/manage-authors" element={<ManageAuthors />} />
                <Route path="/create-book" element={<CreateBook />} />
                <Route path="/edit-book/:id" element={<EditBook />} />
                <Route path="/create-author" element={<CreateAuthor />} />
                <Route path="/edit-author/:id" element={<EditAuthor />} />
              </Routes>
            </div>
          </div>
        </div>
        {/* Render the Footer component */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
