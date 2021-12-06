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
    followers: [String]
    followings: [String]
    isAdmin: Boolean
    createdAt: String!
    posts: [Post]!
  }

  type Like {
    _id: ID!
    createdAt: String!
    username: String!
  }

  type Post {
    _id: ID!
    userId: String!
    postBody: String!
    postDate: String!
    comments: [Comment]!
    img: String
    likes: [Like]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Message {
    convoId: ID!
    sender: String!
    text: String!
  }

  type Convo {
    _id: ID!
    members: [String]!
    messages: [Message]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    getPosts(): [Post]
    getPost(postId: ID!): Post
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
    likePost(postId: ID!): Post
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