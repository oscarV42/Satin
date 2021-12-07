import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { useForm } from '../utils/hooks';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

function PostForm() {
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
      body: ''
    });
  
    const [createPost, { error }] = useMutation(ADD_POST, {
      variables: values,
      update(proxy, result) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        });
        data.getPosts = [result.data.createPost, ...data.getPosts];
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
        values.body = '';
      }
    });
  
    function createPostCallback() {
      createPost();
    }
  
    return (
      <>
        <Form onSubmit={onSubmit}>
          <h2>Create a post:</h2>
          <Form.Field>
            <Form.Input
              placeholder="Hi World!"
              name="body"
              onChange={onChange}
              value={values.body}
              error={error ? true : false}
            />
            <Button type="submit" color="teal">
              Submit
            </Button>
          </Form.Field>
        </Form>
        {error && (
          <div className="ui error message" style={{ marginBottom: 20 }}>
            <ul className="list">
              <li>{error.graphQLErrors[0].message}</li>
            </ul>
          </div>
        )}
      </>
    );
}

export const ADD_POST = gql`
  mutation addPost($img: String, $postBody: String!, $postAuthor: String!) {
    addPost(img: $img, postBody: $postBody, postAuthor: $postAuthor) {
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

export default PostForm;