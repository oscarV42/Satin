const { AuthenticationError, UserInputError } = require('apollo-server-express');

const Auth = require('../../utils/auth');
const Post = require('../../models/Post');

module.exports = {
  Mutation: {
    createComment: async (_, {postId, body}, context) => {
      const { username } = Auth(context);
      if(body.trim() === "") {
        throw new UserInputError('Empty comment', {
          errors: {
            body: `Comment body can't be empty`
          }
        })
      }

      const post = await Post.findById(postId);

      if(post) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: { comments: { body, username, createdAt: new Date().toISOString } },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      } else throw new UserInputError('Post Not Found!');
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = Auth(context);

      return Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    }
  }
}