import React, { useRef, useState } from "react";
import { Redirect } from "react-router";
import BlogPost from "./BlogPost";
import Error from "./../error/Error";
import { useAuth } from "./../../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";

function Post() {
  const { user } = useAuth();
  const { setAlert } = useAlert();
  const [disableButtons, setDisableButtons] = useState(false);
  const titleRef = useRef("");
  const statusRef = useRef("Public");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(0);
  const [blogId, setBlogId] = useState(null);

  const postBlog = (event) => {
    event.preventDefault();
    if (body && body !== "<p><br></p>") {
      setResponse("");
      setDisableButtons(true);
      let newBlog = {
        title: titleRef.current.value,
        status: statusRef.current.value,
        body,
        likes: [user._id.toString()],
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
      })
        .then((res) => {
          // console.log(res.status);
          setTimeout(() => {
            setResponse(res.status);
          }, 1000);
          return res.json();
        })
        .then((data) => {
          if (data.blogId) {
            setBlogId(data.blogId);
          }
          setAlert(data.msg);
        });
    } else setAlert("No blank fields.");
  };

  return (
    <>
      {response === 200 && <Redirect to={`/read/${blogId}`} />}
      {response === 500 ? (
        <Error />
      ) : (
        <div className="row">
          <BlogPost
            type="Post"
            titleRef={titleRef}
            statusRef={statusRef}
            body={body}
            setBody={setBody}
            handleSubmit={postBlog}
            disableButtons={disableButtons}
          />
        </div>
      )}
    </>
  );
}

export default Post;
