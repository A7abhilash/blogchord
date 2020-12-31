import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import UserProfile from "../../containers/UserProfile";
import Loader from "./../../../containers/Loader";
import Error from "./../error/Error";
import { motion } from "framer-motion";
import BlogsContainer from "../../containers/BlogsContainer";
import { useAlert } from "../../contexts/AlertContext";

function ProfileVisit(props) {
  const { user } = useAuth();
  const { setAlert } = useAlert();
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
          if (data.user) {
            setProfile(data.user);
            setBlogs(data.blogs);
            setError(false);
          } else {
            setError(true);
            setAlert(data.msg);
          }
          setLoading(false);
        })
        .catch((err) => {
          // console.log(err);
          setProfile({});
          setBlogs([]);
          setAlert("Server error, Please try later");
          setError(true);
          setLoading(false);
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
      <div className="col-md-3 user-profile mx-2 my-2">
        <UserProfile user={profile} />
      </div>
      <div className="col-md-8 mx-auto my-2">
        <h4>Blogs</h4>
        <div className="row">
          {blogs && <BlogsContainer displayBlogs={blogs} isProfile={false} />}
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
    transition: { delay: 0.2, ease: "easeInOut" },
  },
};
