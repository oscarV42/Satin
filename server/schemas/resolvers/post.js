const { AuthenticationError, UserInputError } = require('apollo-server-express');

const Post = require('../../models/Post');
const Auth = require('../../utils/auth');

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts =  await Post.find().sort({ postDate: -1 });
        return posts;
      } catch(err) {
        throw new Error(err)
      }
    },
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if(post) {
          return post;
        } else {
          throw new Error('Post Not Found!');
        }
      }catch(err) {
        throw new Error(err);
      }
    }
  },

  Mutation: {
    addPost: async (_, { body }, context) => {
      const user = Auth(context);
      
      if(body.trim() === '') {
        throw new Error('Post bodymust not be empty!');
      }

      const newPost = await Post.create({
        postBody: body,
        postAuthor: user,
        postDate: new Date().toISOString
      })

      return newPost;
    },
    removePost: async (_, { postId }, context) => {
      const user = Auth(context);

      try{
        const post = await Post.findById(postId);
        if(user.username === post.postAuthor) {
          Post.findOneAndDelete({ _id: postId});
          return 'Post deleted!';
        } else {
          throw new AuthenticationError('Action not allowed!');
        }
      }catch(err) {
        throw new Error(err);
      }
    }
  }
}