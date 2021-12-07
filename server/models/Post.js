const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  postAuthor: {
    type: String,
    required: true,
  },
  postBody: {
    type: String,
    required: 'You need to leave a post!',
    minlength: 1,
    maxlength: 500,
  },
  postDate: {
    type: Date,
    default: Date.now,
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
      },
    },
  ],
  img: {
    type: String,
  },
  likes: [
    {
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      username: {
        type: String
      }
    }
  ],
},
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema);

module.exports = Post;