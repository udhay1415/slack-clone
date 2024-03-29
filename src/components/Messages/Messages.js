import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import { connect } from 'react-redux'; 
import firebase from '../../firebase';
import Message from './Message';
import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';

class Messages extends React.Component {
  state = { messagesRef: firebase.database().ref('messages'), user: this.props.user, currentChannel: this.props.currentChannel, messages: '', messagesLoading: true, numUniqueUsers: '', searchTerm: '', searchResults: [], searchLoading: false }
  
  componentDidMount() {
    const { currentChannel, user } = this.state;
    if (currentChannel && user) {
      this.addListeners(currentChannel.id);
    }
  }
  
  addListeners(channelId) {
    this.addMessageListener(channelId);
  }
  
  addMessageListener = (channelId) => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val());
      this.setState({ messages: loadedMessages, messagesLoading: false })
      this.countUniqueUsers(loadedMessages);
    });
  }
  
  countUniqueUsers = (messages) => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if(!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    console.log(uniqueUsers);
    const numUniqueUsers = `${uniqueUsers.length} users`;
    this.setState({ numUniqueUsers });
  }
  
  displayMessages = messages => {
    return (
      messages.length > 0 && messages.map(message => (
        <Message 
          key={message.timestamp}
          message={message}
          user={this.state.user}
        />
      ))
    )  
  }
  
  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value, searchLoading: true }, () => this.handleSearch());
  }
  
  handleSearch = () => {
    const channelMessages = [...this.state.messages];
    const regex = new RegExp(this.state.searchTerm, 'gi'); // gi - flag to apply regex globally and case-insensitively
    const searchResults = channelMessages.reduce((acc, channelMessage) => {
      if (
        (channelMessage.content && channelMessage.content.match(regex)) ||
        channelMessage.user.name.match(regex)
      ) {
        acc.push(channelMessage);
      }
      return acc;
    }, []);
    this.setState({ searchResults });
    setTimeout(() => {
      this.setState({ searchLoading: false });
    }, 1000)
  }
  
  render() {
    const { messages, messagesRef, user, currentChannel, numUniqueUsers, searchTerm, searchResults, searchLoading } = this.state;
    return (
      <React.Fragment>
        <MessageHeader 
          currentChannel={currentChannel}
          numUniqueUsers={numUniqueUsers}
          handleChange={this.handleChange}
          searchLoading={searchLoading}
          isPrivateChannel={this.props.isPrivateChannel}
        />

        <Segment>
          <Comment.Group className="messages">
            {searchTerm ? this.displayMessages(searchResults) : this.displayMessages(messages)}
          </Comment.Group>
        </Segment>

        <MessageForm 
          messagesRef={messagesRef}
          currentChannel={currentChannel}
          user={user}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentChannel: state.channel.currentChannel,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {
  
})(Messages);
