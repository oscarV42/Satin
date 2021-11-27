const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  postBody: {
    type: String,
    required: true,
    max: 500,
  },
  postDate: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
  likes: {
    type: Array,
    default: [],
  },
},
  { timestamps: true }
)

const Post = mongoose.model('post', postSchema);

module.exports = Post;