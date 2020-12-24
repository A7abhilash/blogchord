const router = require("express").Router();
const { ensureAuth } = require("../middleware/auth");
const Blog = require("../models/Blogs");
const User = require("../models/Users");
const Bookmark = require("../models/Bookmarks");

//*route    /users/:id
//*desc     Fetch the required user's blogs
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    try {
      const user = await User.findById(req.params.id);
      const blogs = await Blog.find({ user: req.params.id })
        .populate("user")
        .sort({ createdAt: "desc" })
        .lean();
      res.status(200).json({ user, blogs });
    } catch (error) {
      // console.error(error);
      res.status(404).sendStatus(404).statusMessage({ msg: "User not found" }); //.json({ msg: "404 Error" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//*route    /users/auth/:id
//*desc     Fetch the logged in user's blogs & notifications
router.get("/auth/:id", ensureAuth, async (req, res) => {
  try {
    if (req.params.id.toString() === req.user._id.toString()) {
      const blogs = await Blog.find({ user: req.params.id })
        .populate("user")
        .sort({ createdAt: "desc" })
        .lean();
      const savedBlogsList = await Bookmark.findOne({ user: req.params.id });
      // console.log(savedBlogsList);
      const allBlogs = await Blog.find();
      // console.log(allBlogs);
      const savedBlogs = [];
      if (savedBlogsList) {
        savedBlogsList.blogs.forEach((blogId) => {
          savedBlogs.push(
            allBlogs.filter((blog) => blog._id.toString() === blogId.toString())
          );
          // if (allBlogs._id.toString()===blogId) {
          // }
        });
      }
      return res.status(200).json({ blogs, savedBlogs, savedBlogsList });
    }
    res.status(400).json({ msg: "404 Error" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;

//*route    /users/addBookmark
//*desc     add new blog to bookmark
router.patch("/addBookmark", ensureAuth, async (req, res) => {
  try {
    if (req.body.userId.toString() !== req.user.id.toString()) {
      return res.status(400).json({ msg: "404 Error" });
    }
    try {
      const blogToBeSaved = await Blog.findById(req.body.blogId);
      if (blogToBeSaved) {
        const savedBlogsList = await Bookmark.findOne({
          user: req.body.userId,
        });
        // console.log(savedBlogsList.blogs);
        if (!savedBlogsList.blogs.includes(req.body.blogId)) {
          savedBlogsList.blogs.unshift(req.body.blogId); //= [,...savedBlogsList]
          await Bookmark.findOneAndUpdate(
            { user: req.body.userId },
            savedBlogsList
          );
          return res.status(200).json({ msg: "Saved new blog." });
        }
        res.status(200).json({ msg: "Blog is already saved." });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "404 Error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});
