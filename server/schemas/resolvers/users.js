const { AuthenticationError, UserInputError } = require('apollo-server-express');

const { signToken } = require('../../utils/auth');
const User = require('../../models/User');

module.exports = {
  Query: {
    user: async(parent, { username }) => {
      return User.findOne({ username }).populate('posts');
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
  }
}