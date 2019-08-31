import React from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import firebase from '../../firebase';

class Channels extends React.Component {
  state = { channels: [], modal: false, channelName: '', channelDescription: '', channelsRef: firebase.database().ref('channels') }
  
  componentDidMount() {
    this.addListeners();
  }
  
  componentWillUnmount() {
    this.removeListeners();
  }
  
  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on("child_added", snap => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels });
    });
  };
  
  removeListeners = () => {
    this.state.channelsRef.off();
  }
  
  openModal = () => {
    this.setState({ modal: true })
  }
  
  closeModal = () => {
    this.setState({ modal: false })
  }
  
  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  submitHandler = event => {
    event.preventDefault();
    const { channelsRef, channelName, channelDescription } = this.state
    if (this.isFormValid) {
      const key = channelsRef.push().key;
      const newChannel = {
        id: key,
        name: channelName,
        details: channelDescription,
        createdBy: {
          name: this.props.user.displayName
        }
      }
      
      channelsRef.child(key).update(newChannel).then(() => {
        this.setState({ channelName: '', channelDescription: '' });
        this.closeModal(); 
      }).catch(err => {
        console.log(err);
      })
      
    }
  }
  
  isFormValid = () => this.state.channelName && this.state.channelDescription;
  
  render() {
    const { channels } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span><Icon name="exchange" /> CHANNELS</span>
            {" "}
            ({this.state.channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {
            channels.map(channel => (
              <Menu.Item
                key={channel.id}
                onClick={() => console.log(channel)}
                name={channel.name}
                style={{ opacity: 0.8 }}
              >
                # {channel.name}
              </Menu.Item>
            ))
          }
        </Menu.Menu>
        <Modal basic open={this.state.modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.submitHandler}>
              <Form.Field>
                <Input
                  fluid
                  label="Channel Name"
                  name="channelName"
                  onChange={this.onChangeHandler}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="Channel Description"
                  name="channelDescription"
                  onChange={this.onChangeHandler}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.submitHandler}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Channels);