import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Auth from '../utils/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../utils/MyPopup';

function PostCard({
    post: { postBody, postDate, _id, postAuthor, likeCount, commentCount, likes }
  }) {
    const { user } = Auth.getProfile().data;
    
    return (
      <Card fluid key={_id}>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
          <Card.Header>{postAuthor}</Card.Header>
          <Card.Meta as={Link} to={`/posts/${_id}`}>
            {moment(postDate).fromNow(true)}
          </Card.Meta>
          <Card.Description>{postBody}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <LikeButton user={user} post={{ _id, likes, likeCount }} />
          <MyPopup content="Comment on post">
            <Button labelPosition="right" as={Link} to={`/posts/${_id}`}>
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          </MyPopup>
          {user && user.username === postAuthor && <DeleteButton postId={_id} />}
        </Card.Content>
      </Card>
    );
}

export default PostCard;