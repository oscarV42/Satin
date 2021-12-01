import { gql } from '@apollo/client';

export const LOGIN_USER = gql `
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
  mutation addThought($img: String, $postBody: String!, $postAuthor: String!) {
    addThought(img: $img, postBody: $postBody, postAuthor: $postAuthor) {
      _id
      postBody
      postAuthor
      createdAt
      comments {
        _id
        commentText
      }
      likes
      img
    }
  }
`;

