const router = require("express").Router();
const { ensureAuth } = require("../middleware/auth");
const Blog = require("../models/Blogs");
const User = require("../models/Users");

//*route    /users/blogs/:id
//*desc     Fetch the required user's blogs
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const blogs = await Blog.find({ user: req.params.id })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    res.status(200).json({ user, blogs });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
