import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import Card from "../../containers/Card";
import UserProfile from "../../containers/UserProfile";
import Loader from "./../../../containers/Loader";
import Error from "./../error/Error";
import { motion } from "framer-motion";

function ProfileVisit(props) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user._id !== props.match.params.userId) {
      setLoading(true);
      setError(false);
      fetch(`/users/${props.match.params.userId}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setProfile(data.user);
          setBlogs(data.blogs);
          setLoading(false);
          setError(false);
        })
        .catch((err) => {
          setProfile({});
          setBlogs([]);
          setLoading(false);
          setError(true);
        });
    }
  }, []);
  return user._id === props.match.params.userId ? (
    <Redirect to="/dashboard" />
  ) : loading ? (
    <Loader height="80" />
  ) : error ? (
    <Error />
  ) : (
    <motion.div
      variants={profileVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="row"
    >
      <div className="col-md-3 border-right border-secondary">
        <UserProfile user={profile} />
      </div>
      <div className="col-md-8 mx-auto">
        <h4>Blogs</h4>
        <div className="row">
          {blogs &&
            (blogs.length ? (
              blogs.map((blog) => (
                <Card
                  key={blog._id}
                  blog={blog}
                  access={user._id === blog.user._id}
                  isProfile={true}
                />
              ))
            ) : (
              <p className="text-muted">
                {user.firstName} haven't posted any blog.
              </p>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileVisit;

const profileVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: {
      transition: { delay: 0.2, ease: "easeInOut" },
    },
  },
};
