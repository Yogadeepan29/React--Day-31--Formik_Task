import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand mx-auto ps-5 fw-bold fs-1" to="/">
          Formik <i className="fa-solid fa-book-open-reader"></i> Library
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
