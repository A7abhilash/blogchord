import React from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion } from "framer-motion";

function BlogPost({ type, handleSubmit, titleRef, statusRef, body, setBody }) {
  return (
    <motion.div
      variants={blogPostVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="col-md-6 mx-2 mx-md-auto bg-silver text-dark p-3 my-4 rounded"
    >
      <h3 className="text-center">{type} a blog</h3>
      <form
        className="my-3 py-2 border-top border-secondary"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            ref={titleRef}
            className="form-control"
            placeholder="Title"
            defaultValue={titleRef.current}
            required
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            type="text"
            ref={statusRef}
            className="form-control"
            defaultValue={statusRef.current}
            required
          >
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
          <p className="text-muted pl-1">
            <strong>TIP: </strong> Set private status if you want to save your
            blog as draft.
          </p>
        </div>
        <div className="form-group">
          <label>Body:</label>
          <ReactQuill
            className="bg-white"
            value={body}
            onChange={(value) => setBody(value)}
          />
        </div>
        <div className="form-group my-2">
          <button type="submit" className="btn btn-sm btn-success float-right">
            Publish
          </button>
          <Link to="/dashboard" className="btn btn-sm btn-secondary float-left">
            Cancel
          </Link>
        </div>
      </form>
    </motion.div>
  );
}

export default BlogPost;

const blogPostVariant = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: "0",
    transition: {
      delay: 0.2,
      durations: 1,
      type: "spring",
      stiffness: 100,
    },
  },
  exit: {
    y: "100vh",
    transition: { ease: "easeInOut" },
  },
};
