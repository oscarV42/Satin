const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    posts: async () => {
      return await Post.find();
    },
    post: async () => {
      return await Post.findById(_id).populate('user')
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('post');
  
        user.posts.sort((a, b) => b.postDate - a.postDate);
  
        return user;
      }
  
      throw new AuthenticationError('Not logged in');
    },
  
  }
}