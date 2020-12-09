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

module.exports = router;
