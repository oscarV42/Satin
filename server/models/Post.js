const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  postAuthor: {
    type: String,
    required: true,
  },
  postBody: {
    type: String,
    required: 'You need to leave a thought!',
    minlength: 1,
    maxlength: 500,
  },
  postDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
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
  img: {
    type: String,
  },
  likes: {
    type: Array,
    default: [],
  },
},
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema);

module.exports = Post;