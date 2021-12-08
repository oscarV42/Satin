import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth'
import { QUERY_POSTS } from '../utils/queries';
import { ADD_POST } from '../utils/mutations'

function PostForm() {
  const [postBody, setPostBody] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] },
        });
      } catch (e) {
        console.error(JSON.stringify(e));
      }
    },
  }
  );

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: {
          img: '',
          postBody,
          postAuthor: Auth.getProfile().data.username,
        },
      });

      setPostBody('');
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'postBody' && value.length <= 280) {
      setPostBody(value);
      setCharacterCount(value.length);
    }
  };
  
    return (
      <>
        <Form onSubmit={handleFormSubmit}>
          <h2>Create a post:</h2>
          <Form.Field>
            <Form.Input
              placeholder="Hi World!"
              name="postBody"
              onChange={handleChange}
              value={postBody}
              error={error ? true : false}
            />
            <Button type="submit" color="teal">
              Submit
            </Button>
          </Form.Field>
        </Form>
      </>
    );
}

// export const ADD_POST = gql`
//   mutation addPost($img: String, $postBody: String!, $postAuthor: String!) {
//     addPost(img: $img, postBody: $postBody, postAuthor: $postAuthor) {
//       _id
//       postBody
//       postAuthor
//       postDate
//       comments {
//         _id
//         commentText
//       }
//       likes {
//         createdAt
//         username
//       }
//       likeCount
//       commentCount
//       img
//     }
//   }
// `;

export default PostForm;