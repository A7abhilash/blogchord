import React from "react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { updateBookmark, deleteBlog } from "../db/useDB";
import Card from "./Card";

function BlogsContainer({ displayBlogs, savedBlogsList }) {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  //   console.log(displayBlogs);

  const addBookmark = async (blogId) => {
    console.log("Add");
    if (!savedBlogsList.includes(blogId)) {
      let updatedList = [blogId, ...savedBlogsList];
      let res = await updateBookmark(updatedList, user._id);
      console.log(res);
    } else alert("Blog is already saved");
  };

  const removeBookmark = async (blogId) => {
    console.log("Remove");
    if (savedBlogsList.includes(blogId)) {
      let updatedList = savedBlogsList.filter(
        (savedId) => savedId.toString() !== blogId.toString()
      );
      let res = await updateBookmark(updatedList, user._id);
      console.log(res);
    } else alert("Blog wasn't saved");
  };

  return displayBlogs.length ? (
    displayBlogs.map((blog) => (
      <Card
        key={blog._id}
        blog={blog}
        access={user._id === blog.user._id}
        isProfile={true}
        addBookmark={addBookmark}
        isBookmarked={savedBlogsList.includes(blog._id)}
        deleteBlog={deleteBlog}
        removeBookmark={removeBookmark}
      />
    ))
  ) : (
    <p className="text-muted">No blog found.</p>
  );
}

export default BlogsContainer;
