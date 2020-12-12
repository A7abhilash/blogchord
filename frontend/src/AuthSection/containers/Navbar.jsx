import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import icon from "./../../icon.png";

const BACKEND_URL = "http://localhost:7781";
function Navbar() {
  const { user } = useAuth();
  return (
    <nav className="navbar navbar-expand-md bg-gray shadow-md">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center text-danger"
        >
          <motion.img
            src={icon}
            variants={headerIcon}
            initial="hidden"
            animate="visible"
            alt="blogchord"
            className="img-fluid mr-1"
            style={{ height: 50 }}
          />
          <motion.h1
            variants={headerTitle}
            initial="hidden"
            animate="visible"
            id="header-title"
          >
            Blogchord
          </motion.h1>
        </Link>
        {user && (
          <>
            <button
              className="navbar-toggler text-danger border-danger"
              data-toggle="collapse"
              data-target="#navbar"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbar">
              <ul className="navbar-nav ml-auto mr-2 align-items-center">
                <li className="nav-item mx-md-2 my-1">
                  <Link to="/" className="nav-link text-light">
                    <h5>Blogs</h5>
                  </Link>
                </li>
                <li className="nav-item mx-md-2 my-1">
                  <Link to="/dashboard" className="nav-link text-light">
                    <h5>My profile</h5>
                  </Link>
                </li>
                <li className="nav-item mx-md-2 my-1">
                  <a
                    role="button"
                    href={`${BACKEND_URL}/auth/logout`}
                    className="btn btn-sm btn-secondary text-light pb-0"
                  >
                    <h6>Sign out</h6>
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

const headerIcon = {
  hidden: {
    opacity: 0,
    rotateZ: 0,
  },
  visible: {
    opacity: 1,
    rotateZ: 360,
    transition: { duration: 1 },
  },
};

const headerTitle = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 1 },
  },
};
