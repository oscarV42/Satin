const { AuthenticationError, UserInputError } = require('apollo-server-express');

const Post = require('../../models/Post');
const Auth = require('../../utils/auth');

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts =  Post.find().sort({ postDate: -1 });
        return posts;
      } catch(err) {
          throw new Error(err)
      }
    }
  }
}