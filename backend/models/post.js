const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  author: { type: String, default: "Unknown" },
  title: { type: String, required: true },
  text: { type: String, required: true },
});

const Post = mongoose.model("Post", postSchema, "posts");
module.exports = Post;
