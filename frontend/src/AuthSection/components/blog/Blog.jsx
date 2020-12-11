import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { Link } from "react-router-dom";
import Loader from "../../../containers/Loader";
import { useAuth } from "../../../contexts/AuthContext";
import UserProfile from "../../containers/UserProfile";
import Error from "../error/Error";

function Blog(props) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blog, setBlog] = useState({});

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`/blogs/read/${props.match.params.id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
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
        <h4 className="text-center text-danger">Author</h4>
        <UserProfile user={blog.user} />
        <Link
          to={`${
            blog.user._id !== user._id ? `/user/${blog.user._id}` : "/dashboard"
          }`}
          className="btn btn-info btn-sm btn-block my-2"
        >
          Visit Profile
        </Link>
      </div>
      <div className="col-md-7 mx-2 p-2 my-2 mx-md-auto bg-dark">
        <h3 className="text-center text-warning">{blog.title}</h3>
        <div className="border-left border-danger m-2 pl-2">
          <ReactQuill
            className="bg-dark text-white"
            value={blog.body}
            readOnly={true}
            theme="bubble"
          />
        </div>
      </div>
    </>
  );
}

export default Blog;
