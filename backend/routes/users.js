const router = require("express").Router();
const { ensureAuth } = require("../middleware/auth");
const Blogs = require("../models/Blogs");

//*route    /users/blogs/:id
//*desc     Fetch the required user's blogs
router.get("/blogs/:id", ensureAuth, async (req, res) => {
  try {
    const blogs = await Blogs.find({ user: req.params.id })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
