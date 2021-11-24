const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  image: {
    type: String,
    required: false
  },
  postBody: {
    type: String,
    required: true
  },
  postDate: {
    type: Date,
    default: Date.now
  }
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;