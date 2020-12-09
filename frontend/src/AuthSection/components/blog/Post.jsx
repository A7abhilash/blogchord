import React, { useRef, useState } from "react";
import { Redirect } from "react-router";
import { useAuth } from "./../../../contexts/AuthContext";
import BlogPost from "./BlogPost";
import Error from "./../error/Error";

function Post() {
  const { user } = useAuth();
  const titleRef = useRef("");
  const statusRef = useRef("Public");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(0);

  const postBlog = (event) => {
    setResponse("");
    event.preventDefault();
    let newBlog = {
      title: titleRef.current.value,
      status: statusRef.current.value,
      body,
      user: user._id,
    };
    // console.log(newBlog);
    fetch("/blogs/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    }).then((res) => {
      // console.log(res.status);
      setResponse(res.status);
    });
  };

  return (
    <>
      {response === 200 && <Redirect to="/dashboard" />}
      {response === 500 && <Error />}
      <BlogPost
        type="Post"
        titleRef={titleRef}
        statusRef={statusRef}
        body={body}
        setBody={setBody}
        handleSubmit={postBlog}
      />
    </>
  );
}

export default Post;
