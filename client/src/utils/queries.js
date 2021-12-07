import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        _id
        postBody
        postDate
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query posts {
    posts {
      _id
      postBody
      postAuthor
      postDate
      commentCount
      likeCount
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query post($postId: ID!) {
    post(postId: $postId) {
      _id
      postBody
      postAuthor
      postDate
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
      likes {
        username
        createdAt
      }
    }
  }
`;
