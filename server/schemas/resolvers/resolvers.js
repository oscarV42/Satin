const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Convo } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('posts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('posts');
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
    },
    convos: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Convo.find(params);
    },
    convo: async (parent, { convoId }) => {
      return Convo.findOne({ _id: convoId })
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addPost: async (parent, { postBody, postAuthor }) => {
      const post = await Post.create({ postBody, postAuthor });

      await User.findOneAndUpdate(
        { username: postAuthor },
        { $addToSet: { posts: post._id } }
      );

      return post;
    },
    addComment: async (parent, { postId, commentText, commentAuthor }) => {
      return Post.findOneAndUpdate(
        { _id: postId },
        {
          $addToSet: { comments: { commentText, commentAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removePost: async (parent, { postId }) => {
      return Post.findOneAndDelete({ _id: postId });
    },
    removeComment: async (parent, { postId, commentId }) => {
      return Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
    addConvo: async (parent, { members }) => {
      const convo = await Convo.create({ members });
      return convo;
    },
    addMessage: async (parent, { convoId, sender, text }) => {
      return Convo.findOneAndUpdate(
        { _id: convoId },
        {
          $addToSet: { messages: { sender, text } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeMessage: async (parent, { convoId, messageId }) => {
      return Convo.findOneAndUpdate(
        { _id: convoId },
        { $pull: { comments: { _id: messageId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;