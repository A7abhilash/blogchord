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
    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: msg.error });
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
    res.status(500);
  }
});

//*route    /blogs/read/:id
//*desc     Display all public blogs
router.get("/read/:id", ensureAuth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user").lean();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500);
  }
});

//*route    /blogs/delete/:id
//*desc     Display all public blogs
router.delete("/delete/:id", ensureAuth, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200);
  } catch (error) {
    res.status(500);
  }
});

module.exports = router;
