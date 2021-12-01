import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_POST = gql`
  query getPost {
    posts {
      _id
      postBody
      postAuthor
      postDate
      likes
      img
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
      postBody
      postAuthor
      postDate
      comments {
        _id
        commentText
        createdAt
      }
      likes
      img
    }
  }
`;

export const QUERY_SINGLE_CONVO = gql`
  query getSingleConvo($convId: ID!) {
    convo(convoId: $convoId) {
      _id
      members
      messages{
        _id
        sender
        text
      }
    }
  }
`;

