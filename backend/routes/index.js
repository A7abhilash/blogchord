const Blogs = require("../models/Blogs");
const express = require("../node_modules/express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("./../middleware/auth");

const Users = require("./../models/Users");

//Add ensureAuth whenever u wanna check whether the user is authenticated or not...

//@route     GET /index
//@desc       Welcome Homepage
router.get("/", ensureGuest, (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/`);
});

//@route     GET /dashboard
//@desc       Open Dashboard when succesfully logged In
router.get("/dashboard", ensureAuth, (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
});

//@route     GET /user
//@desc       Send the details of logged in user
router.get("/user", async (req, res) => {
  try {
    if (req.user) {
      let user = await Users.findOne({ googleId: req.user.googleId });
      let blogs = await Blogs.find({ user: req.user._id })
        .populate("user")
        .sort({ createdAt: "desc" })
        .lean();
      // console.log(user);
      return res.json({ user, blogs });
    }
    res.json(null);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
