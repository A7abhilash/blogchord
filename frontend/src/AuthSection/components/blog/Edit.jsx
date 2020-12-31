import React, { useRef, useState } from "react";
import { Redirect } from "react-router";
import { useAuth } from "./../../../contexts/AuthContext";
import BlogPost from "./BlogPost";
import Error from "./../error/Error";
import Loader from "../../../containers/Loader";
import { useEffect } from "react";
import { useAlert } from "../../contexts/AlertContext";

function Edit(props) {
  const { user } = useAuth();
  const { setAlert } = useAlert();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const titleRef = useRef("");
  const statusRef = useRef("Public");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(0);

  const editBlog = async (event) => {
    event.preventDefault();
    if (body !== "<p><br></p>") {
      setDisableButtons(true);
      setResponse("");
      let blog = {
        title: titleRef.current.value,
        status: statusRef.current.value,
        body,
        user: user._id,
      };
      // console.log(newBlog);
      fetch(`/blogs/edit/${props.match.params.id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      })
        .then((res) => {
          // console.log(res.status);
          setResponse(res.status);
          return res.json();
        })
        .then((data) => {
          setAlert(data.msg);
        });
    } else setAlert("No blank fields.");
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    setDisableButtons(false);
    fetch(`/blogs/read/${props.match.params.id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (!data.msg) {
          titleRef.current = data.blog.title;
          statusRef.current = data.blog.status;
          setBody(data.blog.body);
          setError(false);
        } else {
          setError(true);
          setAlert(data.msg);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Loader height="80" />
  ) : (
    <>
      {response === 200 && <Redirect to={`/read/${props.match.params.id}`} />}
      {response === 500 || response === 400 || error ? (
        <Error />
      ) : (
        <BlogPost
          type="Edit"
          titleRef={titleRef}
          statusRef={statusRef}
          body={body}
          setBody={setBody}
          handleSubmit={editBlog}
          disableButtons={disableButtons}
        />
      )}
    </>
  );
}

export default Edit;
