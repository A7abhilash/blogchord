const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  blogs: {
    type: Array,
  },
});

module.exports = mongoose.model("Bookmark", BookmarkSchema);
