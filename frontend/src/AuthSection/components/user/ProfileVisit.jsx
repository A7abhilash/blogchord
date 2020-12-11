import React, { useEffect } from "react";

function ProfileVisit(props) {
  useEffect(() => {
    fetch(`/users/blogs/${props.params.userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //   setBlogs(data);
      })
      .catch((err) => {
        alert(err.msg);
        //   setBlogs([]);
      });
  });
  return <div>{props.params.userId}</div>;
}

export default ProfileVisit;
