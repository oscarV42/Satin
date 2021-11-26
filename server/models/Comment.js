const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  commentBody: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;