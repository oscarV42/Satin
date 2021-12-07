import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { QUERY_POSTS } from '../utils/queries';
import Auth from '../utils/auth'

function Home() {
  // const { user } = Auth.getProfile().data;
  const {loading, data}= useQuery(QUERY_POSTS);
  const posts = data?.posts || [];
  
    return (
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {Auth.loggedIn() && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          {loading ? (
            <h1>Loading posts..</h1>
          ) : (
            <Transition.Group>
              {posts &&
                posts.map((post) => (
                  <Grid.Column style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    );
}
  
export default Home;