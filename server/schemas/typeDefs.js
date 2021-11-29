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
    followers: Array
    followings: Array
    isAdmin: Boolean
    createdAt: Date!
  }

  type Post {
    _id: ID!
    userId: String!
    postBody: String!
    postDate: Date!
    comments: Array
    img: String
    likes: Array
  }
  
  type Message {
    _id: ID!
    convoId: String
    sender: String!
    text: String!
  }

  type Convo {
    _id: ID!
    members: Array
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
    messages(convoId: ID!): [Message]
    convo(members: Array!): Convo
    convos(userId: String): [Convo]
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
    addMessage(convoId: ID!, sender: String!, text: String!): Message
    removeMessage(messageId: ID!): Message 
  }
`;

module.exports = typeDefs