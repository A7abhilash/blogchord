const router = require("express").Router();
const User = require("./../models/Users");
const Blog = require("./../models/Blogs");
const { ensureAuth } = require("../middleware/auth");

//*route    /blogs/post
//*desc     Post a new blog
router.post("/post", ensureAuth, async (req, res) => {
  try {
    // console.log(req.body);
    await Blog.create(req.body);
    res.status(200).json({ msg: "Blog posted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

//*route    /blogs/
//*desc     Display all public blogs
router.get("/", ensureAuth, async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "Public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//*route    /blogs/read/:id
//*desc     Display all public blogs
router.get("/read/:id", ensureAuth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user").lean();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//*route    /blogs/edit/:id
//*desc     Edit a blog
router.patch("/edit/:id", ensureAuth, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(400).json({ msg: "404 Error" });
    }
    if (blog.user.toString() !== req.user.id.toString()) {
      return res.status(400).json({ msg: "404 Error" });
    }
    await blog.updateOne(req.body);
    res.status(200).json({ msg: "Edited blog" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//*route    /blogs/delete/:id
//*desc     Delete a blog
router.delete("/delete/:id", ensureAuth, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(400);
    }
    if (blog.user.toString() !== req.user.id.toString()) {
      return res.status(400);
    }
    await blog.deleteOne(req.body);
    res.status(200).json({ msg: "Deleted blog" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
