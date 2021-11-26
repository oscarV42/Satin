const mongoose = require('mongoose');
const Comment = require('./Comment');
const { Schema } = mongoose;

const postSchema = new Schema({
  postBody: {
    type: String,
    required: true
  },
  postDate: {
    type: Date,
    default: Date.now
  },
  comments: [Comment.schema],
  likes: [{
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
})

const Post = mongoose.model('post', postSchema);

module.exports = Post;