import React from "react";
import { Link } from "react-router-dom";

function Card({ blog, access }) {
  return (
    <div className="col-md-5 card mx-2 mx-md-auto my-2 p-0 shadow-lg bg-dark rounded">
      <div className={`card-header ${access && "bg-secondary"}`}>
        <Link
          to={`${!access ? `/user/:${blog.user._id}` : "/dashboard"}`}
          className="d-flex align-items-center"
        >
          <img
            src={blog.user.image}
            alt="profile"
            className="img-fluid rounded-circle mr-2"
            style={{ height: 30 }}
          />
          <h6 className="m-0 text-light">{blog.user.displayName}</h6>
        </Link>
      </div>
      <div className="card-content p-2 border-top border-secondary">
        <h5 className="text-danger">{blog.title}</h5>
        {access && (
          <div className="badge badge-pill badge-danger py-1 px-2 mb-1">
            {blog.status}
          </div>
        )}
        <div className="d-flex align-items-center">
          <Link
            to={`/read/:${blog._id}`}
            className="btn btn-success btn-sm my-1"
          >
            Read
          </Link>
          {access && (
            <div className="ml-auto">
              <Link
                to={`/edit/:${blog._id}`}
                className="btn btn-info btn-sm m-1"
              >
                Edit
              </Link>
              <button className="btn btn-primary btn-sm m-1">Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
