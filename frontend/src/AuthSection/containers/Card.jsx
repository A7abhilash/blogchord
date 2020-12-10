import React from "react";
import { Link } from "react-router-dom";

function Card({ blog, access, isProfile }) {
  const deleteBlog = (id) => {
    if (access) {
      if (window.confirm("Are you sure to delete this blog?")) {
        fetch(`/blogs/delete/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then(() => {
            alert("Blog deleted.");
          })
          .catch((err) => {
            alert("Error");
          });
      }
    }
  };

  return (
    <div className="col-md-5 card mx-2 mx-md-auto my-2 p-0 shadow-lg bg-dark rounded">
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
        {access && (
          <div className="ml-auto d-flex align-items-center">
            <Link to={`/edit/${blog._id}`} className="text-warning m-1">
              <i className="fas fa-edit"></i>
            </Link>
            <h6 className="options m-1" onClick={() => deleteBlog(blog._id)}>
              <i className="fas fa-trash"></i>
            </h6>
          </div>
        )}
      </div>
      <div className="card-content p-2 border-top border-secondary">
        <h5 className="text-light">{blog.title}</h5>
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
          <div className="ml-auto d-flex align-items-center">
            <Link to={`/edit/${blog._id}`} className="text-danger m-1">
              <i className="far fa-heart fa-lg"></i>
              {/* <i className="fas fa-heart fa-lg"></i> */}
            </Link>
            <h6 className="text-primary m-1">
              <i className="far fa-star fa-lg"></i>
              {/* <i className="fas fa-star fa-lg"></i> */}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;