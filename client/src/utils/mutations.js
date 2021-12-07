import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postBody: String!, $postAuthor: String!) {
    addPost(postBody: $postBody, postAuthor: $postAuthor) {
      _id
      postBody
      postAuthor
      postDate
      commentCount
      likeCount
      comments {
        commentText
        commentAuthor
        createdAt
      }
      likes {
        username
        createdAt
      }
      img
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $postId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      postId: $postId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
      _id
      postBody
      postAuthor
      postDate
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
