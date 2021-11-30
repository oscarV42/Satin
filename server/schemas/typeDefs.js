const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    firstName: String
    lastName: String
    profilePicture: String
    coverPicture: String
    followers: [Follower]
    followings: [Following]
    isAdmin: Boolean
    createdAt: Date!
    posts: [Post]!
  }

  type Post {
    _id: ID!
    userId: String!
    postBody: String!
    postDate: Date!
    comments: [Comment]!
    img: String
    likes: [Like]!
  }

  type Convo {
    _id: ID!
    members: [Member]!
    messages: [Message]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    convo(convoId: String!): Convo
    convos(username: String): [Convo]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, username: String!, password: String!): Auth
    addPost(img: String, postBody: String!, userId: String!): Post
    addComment(
      postId: ID!
      commentText: String!
      commentAuthor: String!
    ): Post
    removePost(postId: ID!): Post
    removeComment(thoughtId: ID!, commentId: ID!): Post
    addConvo(senderId: String!, recieverId: String!): Convo
    addMessage(
      convoId: ID!
      sender: String!
      text: String!
    ): Convo
    removeMessage(convoId: ID!, messageId: ID!): Convo 
  }
`;

module.exports = typeDefs