import React from 'react';
import moment from 'moment';
import { Comment } from 'semantic-ui-react';

const timeFromNow = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user }) => {
  return (
    <Comment>
      <Comment.Content>
        <Comment.Author as="a">{message.user.name}</Comment.Author>
        <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
        <Comment.Text>{message.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

export default Message;