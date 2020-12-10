import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../containers/Loader";
import UserProfile from "../../containers/UserProfile";
import Error from "../error/Error";

function Blog(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blog, setBlog] = useState({});

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`/blogs/read/${props.match.params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBlog(data);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Loader height="50" />
  ) : error ? (
    <Error />
  ) : (
    <>
      <div className="col-md-4 my-2">
        <UserProfile user={blog.user} />
        <Link
          to={`/user/${blog.user._id}`}
          className="btn btn-info btn-sm btn-block"
        >
          See Profile
        </Link>
      </div>
      <div className="col-md-7 mx-2 p-2 my-2 mx-md-auto bg-dark">
        <h4 className="text-center">{blog.title}</h4>
        <div className=" border-left border-danger ml-2">
          <p>{blog.body}</p>
        </div>
      </div>
    </>
  );
}

export default Blog;
