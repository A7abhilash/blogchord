import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Card({
  blog,
  access,
  isProfile,
  addBookmark,
  deleteBlog,
  isBookmarked,
  removeBookmark,
}) {
  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="col-md-5 card mx-2 mx-md-auto my-2 p-0 shadow-lg bg-dark rounded"
    >
      <div
        className={`card-header ${
          access && "bg-secondary"
        } d-flex align-items-center`}
      >
        <Link
          to={`${!access ? `/user/${blog.user._id}` : "/dashboard"}`}
          className="d-flex align-items-center"
        >
          <img
            src={blog.user.image}
            alt="profile"
            className="img-fluid rounded-circle mr-2"
            style={{ height: 30 }}
          />
          <h6 className="m-0 text-danger">{blog.user.displayName}</h6>
        </Link>
        <div className="ml-auto d-flex align-items-center">
          {access ? (
            <>
              <Link to={`/edit/${blog._id}`} className="text-info m-1">
                <i className="fas fa-edit"></i>
              </Link>
              <h6
                className="options m-1 text-dark"
                onClick={() => deleteBlog(blog._id, access)}
              >
                <i className="fas fa-trash"></i>
              </h6>
            </>
          ) : (
            <h6 className="text-primary m-1 options">
              <motion.i
                variants={starVariant}
                whileHover="hover"
                whileTap="tap"
                className={`${isBookmarked ? "fas fa-star" : "far fa-star"}`}
                onClick={
                  isBookmarked
                    ? () => removeBookmark(blog._id)
                    : () => addBookmark(blog._id)
                }
              ></motion.i>
            </h6>
          )}
        </div>
      </div>
      <div className="card-content p-2 border-top border-secondary">
        <h5 className="text-light">{blog.title}</h5>
        <p className="text-muted mb-1">
          <i className="fas fa-clock mr-1"></i>
          <span>{new Date(blog.createdAt).toDateString()}</span>
        </p>
        {isProfile && access && (
          <div className="badge badge-pill badge-danger py-1 px-2 mb-1">
            {blog.status}
          </div>
        )}
        <div className="d-flex align-items-center">
          <Link
            to={`/read/${blog._id}`}
            className="btn btn-success btn-sm my-1"
          >
            Read
          </Link>
          <div className="ml-auto">
            <motion.i
              variants={heartVariant}
              whileHover="hover"
              whileTap="tap"
              className="far fa-heart fa-lg options text-warning"
            ></motion.i>
            <span className="text-muted ml-1">(0)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;

const cardVariant = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
    },
  },
  exit: {
    scale: 0,
    transition: {
      delay: 0.2,
      duration: 0.5,
      transition: { ease: "easeInOut" },
    },
  },
};

const starVariant = {
  hover: {
    scale: 1.1,
    fill: "#007bff",
  },
  tap: {
    scale: 0.8,
  },
};

const heartVariant = {
  hover: {
    scale: 1.1,
    fill: "#007bff",
  },
  tap: {
    scale: 0.8,
  },
};
