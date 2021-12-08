const { AuthenticationError, UserInputError } = require('apollo-server-express');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Auth = require('../../utils/auth');

module.exports = {
  Query: {
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      try {
        const posts =  await Post.find(params).sort({ postDate: -1 });
        return posts;
      } catch(err) {
        throw new Error(err)
      }
    },
    post: async (parent, { postId }) => {
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
    addPost: async (parent, { postBody, postAuthor }) => {
      
      if(postBody.trim() === '') {
        throw new Error('Post body must not be empty!');
      }

      const newPost = await Post.create({
        postBody,
        postAuthor,
        postDate: new Date().toISOString()
      })

      await User.findOneAndUpdate(
        { username: postAuthor },
        { $addToSet: { posts: newPost._id } }
      );


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
    },
    likePost: async (_, { postId }, context) => {
      const { username } = Auth(context);

      const post = await Post.findById(postId);
      if(post) {
        if(post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          })
        }
        await post.save();
        return post;
      } else throw new UserInputError('Post Not FOund!');
    }
  }
}