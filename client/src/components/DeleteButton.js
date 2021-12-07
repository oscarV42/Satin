import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { QUERY_POSTS } from '../utils/queries';
import MyPopup from '../utils/MyPopup';

function DeleteButton({ postId, commentId }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
  
    const mutation = commentId ? REMOVE_COMMENT : REMOVE_POST;
  
    const [deletePostOrMutation] = useMutation(mutation, {
      update(proxy) {
        setConfirmOpen(false);
        if (!commentId) {
          const data = proxy.readQuery({
            query: QUERY_POSTS
          });
          data.getPosts = data.getPosts.filter((p) => p.id !== postId);
          proxy.writeQuery({ query: QUERY_POSTS, data });
        }
      },
      variables: {
        postId,
        commentId
      }
    });
    return (
      <>
        <MyPopup content={commentId ? 'Delete comment' : 'Delete post'}>
          <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => setConfirmOpen(true)}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        </MyPopup>
        <Confirm
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
        />
      </>
    );
}

export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
      postBody
      postAuthor
      postDate
      comments {
        _id
        commentText
      }
      likes {
        createdAt
        username
      }
      likeCount
      commentCount
      img
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment(
    $postId: ID!
    $commentId: ID!
  ) {
    removeComment(
      postId: $postId
      commentId: $commentId
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
      likes {
        createdAt
        username
      }
      likeCount
      commentCount
      img
    }
  }
`;

export default DeleteButton;