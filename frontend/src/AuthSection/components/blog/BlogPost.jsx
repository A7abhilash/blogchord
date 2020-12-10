import React from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function BlogPost({ type, handleSubmit, titleRef, statusRef, body, setBody }) {
  return (
    <div className="col-md-6 mx-2 mx-md-auto bg-silver text-dark p-3 my-4 rounded">
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
    </div>
  );
}

export default BlogPost;