import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import icon from "./../../icon.png";

const BACKEND_URL = "http://localhost:7781";
function Navbar() {
  const { user } = useAuth();
  return (
    <nav className="navbar navbar-expand-md bg-gray shadow-md py-0 my-1">
      <div className="container">
        <Link
          to="/"
          className={`navbar-brand d-flex align-items-center text-danger ${
            !user && "mx-auto"
          }`}
        >
          <motion.img
            src={icon}
            variants={headerIcon}
            initial="hidden"
            animate="visible"
            alt="blogchord"
            className="img-fluid mr-1"
            style={{ height: 40 }}
          />
          <motion.h3
            variants={headerTitle}
            initial="hidden"
            animate="visible"
            id="header-title"
          >
            Blogchord
          </motion.h3>
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
                  <Link to="/" className="nav-link text-light d-flex">
                    <i className="fas fa-home fa-lg pt-1"></i>
                    <h5 className="d-md-none ml-2">Blogs</h5>
                  </Link>
                </li>
                <li className="nav-item mx-md-2 my-1">
                  <Link to="/dashboard" className="nav-link text-light d-flex">
                    <i className="fas fa-user-circle fa-lg pt-1"></i>
                    <h5 className="d-md-none ml-2 pb-1">My profile</h5>
                  </Link>
                </li>
                <li className="nav-item mx-md-2 my-1">
                  <a
                    role="button"
                    href={`${BACKEND_URL}/auth/logout`}
                    className="btn btn-sm btn-secondary text-light pb-md-2 d-flex"
                  >
                    <i className="fas fa-sign-out-alt my-1 my-md-0 pt-md-1"></i>
                    <h6 className="d-md-none ml-2 ">Sign out</h6>
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

// const bellVariant = {
//   visible: {
//     rotateZ: [0, -20, 20, -20, 0],
//     transition: { delay: 0.5, yoyo: Infinity },
//   },
//   onHover: {
//     scale: 1.1,
//   },
//   onTap: {
//     scale: 0.8,
//   },
// };
