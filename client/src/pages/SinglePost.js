import React, { useState } from 'react';
// Import the `useParams()` hook
import { useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Icon,
  Label
} from 'semantic-ui-react';

import { QUERY_SINGLE_POST } from '../utils/queries'
import { ADD_COMMENT } from '../utils/mutations';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../utils/MyPopup';

import Auth from '../utils/auth';

function SinglePost() {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });

  const post = data?.post || {};

  const { user } = Auth.getProfile().data

  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          postId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };


  let postMarkup;
  if (!post) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      _id,
      postBody,
      postDate,
      postAuthor,
      comments,
      likes,
      likeCount,
      commentCount
    } = post;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{postAuthor}</Card.Header>
                <Card.Meta>{moment(postDate).fromNow()}</Card.Meta>
                <Card.Description>{postBody}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ _id, likeCount, likes }} />
                <MyPopup content="Comment on post">
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log('Comment on post')}
                  >
                    <Button basic color="blue">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                </MyPopup>
                {user && user.username === postAuthor && (
                  <DeleteButton postId={_id} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form onSubmit = {handleFormSubmit}>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={commentText}
                        onChange={handleChange}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={commentText.trim() === ''}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment._id}>
                <Card.Content>
                  {user && user.username === comment.commentAuthor && (
                    <DeleteButton postId={_id} commentId={comment._id} />
                  )}
                  <Card.Header>{comment.commentAuthor}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.commentText}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

export default SinglePost;