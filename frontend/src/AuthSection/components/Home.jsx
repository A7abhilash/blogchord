import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../containers/Loader";
import { useAuth } from "../../contexts/AuthContext";
import Card from "../containers/Card";
import Error from "./error/Error";

function Home() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch("/blogs/")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setBlogs(data);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return error ? (
    <Error />
  ) : (
    <div className="col-md-8 mx-auto">
      <div className="d-flex align-items-center my-2">
        <h4>Blogs</h4>
        <Link to="/post" className="btn btn-sm btn-info ml-auto pb-0">
          <h6>Post a blog</h6>
        </Link>
      </div>
      {loading ? (
        <Loader height="50" />
      ) : (
        <div className="row">
          {blogs &&
            (blogs.length ? (
              blogs.map((blog) => (
                <Card
                  key={blog._id}
                  blog={blog}
                  access={user._id === blog.user._id}
                  isProfile={false}
                />
              ))
            ) : (
              <p>No blogs found.</p>
            ))}
        </div>
      )}
    </div>
  );
}

export default Home;
