import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  updateBookmark,
  deleteBlog,
  getLoggedInUserDetails,
  updateLikes,
} from "../db/useDB";
import Card from "./Card";

function BlogsContainer({ displayBlogs, isProfile }) {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [savedLists, setSavedLists] = useState([]);
  //   console.log(displayBlogs);
  useEffect(() => {
    console.log("useEffect called");
    initialSetup();
  }, []);
  const initialSetup = async () => {
    const data = await getLoggedInUserDetails(user._id);
    setSavedLists(data.savedBlogsList.blogs);
    setBlogs(displayBlogs);
  };

  const addBookmark = async (blogId) => {
    if (!savedLists.includes(blogId)) {
      let updatedList = [blogId, ...savedLists];
      let res = await updateBookmark(updatedList, user._id);
      setSavedLists(updatedList);
      alert(res.msg);
    } else alert("Blog is already saved");
  };

  const removeBookmark = async (blogId) => {
    if (savedLists.includes(blogId)) {
      let updatedList = savedLists.filter(
        (savedId) => savedId.toString() !== blogId.toString()
      );
      let res = await updateBookmark(updatedList, user._id);
      setSavedLists(updatedList);
      alert(res.msg);
    } else alert("Blog wasn't saved");
  };

  const likeBlog = async (blog) => {
    console.log(blog);
    let updatedLikes = {
      likes: [...blog.likes, user._id],
      user: user._id,
    };
    console.log(updatedLikes);
    // blog["likes"] = [...blog.likes, user._id];
    // console.log(blog);
    await updateLikes(updatedLikes, blog._id);
  };

  const dislikeBlog = async (blog) => {
    console.log(blog);
    let updatedLikes = {
      likes: blog.likes.filter((id) => id !== user._id),
      user: user._id,
    };
    console.log(updatedLikes);
    await updateLikes(updatedLikes, blog._id);
  };

  return displayBlogs.length ? (
    displayBlogs.map((blog) => (
      <Card
        key={blog._id}
        blog={blog}
        access={user._id === blog.user._id}
        isProfile={isProfile}
        addBookmark={addBookmark}
        isBookmarked={savedLists.includes(blog._id)}
        deleteBlog={deleteBlog}
        removeBookmark={removeBookmark}
        likes={blog.likes}
        isLiked={blog.likes.includes(user._id)}
        likeBlog={likeBlog}
        dislikeBlog={dislikeBlog}
      />
    ))
  ) : (
    <p className="text-muted">No blog found.</p>
  );
}

export default BlogsContainer;
