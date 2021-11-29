const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Message, Convo } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('post');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('post');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
    },
  },

}

module.exports = resolvers;