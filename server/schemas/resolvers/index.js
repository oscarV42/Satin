const postsResolvers = require('./post');
const usersResolvers = require('./users');
const commentsResolvers = require('./comment');

module.exports = {
    Post: {
      likeCount: (parent) => parent.likes.length,
      commentCount: (parent) => parent.comments.length
    },
    Query: {
      ...postsResolvers.Query.posts,
      ...postsResolvers.Query.post,
      ...usersResolvers.Query
    },
    Mutation: {
      ...usersResolvers.Mutation,
      ...postsResolvers.Mutation,
      ...commentsResolvers.Mutation
    },
  };