import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Segment } from 'semantic-ui-react';
import firebase from '../../firebase';

class MessageForm extends React.Component {
  state = { message: '', loading: false }
  
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  sendMessage = () => {
    const { messagesRef, currentChannel, user } = this.props;
    const { message } = this.state;
    
    if (message) {
      messagesRef.child(currentChannel.id).push().set({
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        content: message,
        user: {
          id: user.uid,
          name: user.displayName,
          avatar: ''
        }
      }).then(res => {
        console.log(res);
        this.setState({ loading: false, message: '' });
      }).catch(err => {
        console.log(err);
        this.setState({ loading: false });
      })
    }
  }
  
  render() {
    const { message, loading } = this.state;
    return (
      <Segment className="message-form" style={{ marginRight: 10 }}>
        <Input
          fluid
          name="message"
          value={message}
          onChange={this.handleChange}
          style={{ marginBottom: '0.8em' }}
          label={
            <Button
              floated="right"
              color="green"
              onClick={this.sendMessage}
              disabled={loading}
              content="Send"
            />
          }
          labelPosition="right"
          placeholder="Write your messages .."
        />


      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentChannel: state.channel.currentChannel,
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(MessageForm);