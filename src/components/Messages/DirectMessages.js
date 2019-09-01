import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import firebase from '../../firebase';

class DirectMessages extends React.Component {
  state = { 
    users: [], 
    user: this.props.user,
    userRef: firebase.database().ref('users'),
    connectedRef: firebase.database().ref('.info/connected'),
    presenceRef: firebase.database().ref('presence') 
  }
  
  componentDidMount() {
    const { user } = this.state;
    if (user) {
      this.addListener(user.uid)
    }
  }
  
  addListener(userUid) {
    let loadedUsers = [];
    this.state.userRef.on('child_added', snap => {
      if(snap.key !== userUid) {
        let user = snap.val();
        user['uid'] = snap.key;
        user['state'] = 'offline';
        console.log(user);
        loadedUsers.push(user);
        this.setState({ users: loadedUsers });
      }
    });
    
    this.state.connectedRef.on('value', snap => {
      console.log(snap.val());
      if (snap.val() === true) {
        const ref = this.state.presenceRef.child(userUid);
        ref.set(true);
        ref.onDisconnect().remove(err => {
          if (err != null) {
            console.log(err);
          }
        })
      }
    });
    
    this.state.presenceRef.on('child_added', snap => {
      if (userUid !== snap.key) {
        this.addStatusToUser(snap.key);
      }
    })
    
    this.state.presenceRef.on('child_removed', snap => {
      if (userUid !== snap.key) {
        this.addStatusToUser(snap.key, false);
      }
    })
  }
  
  addStatusToUser = (userId, connected = true) => {
    const updatedUsers = this.state.users.reduce((acc, user) => {
      if (user.uid === userId) {
        user['status'] = `${connected ? 'online' : 'offline' }`
      }
      return acc.concat(user);
    }, []);
    this.setState({ users: updatedUsers})
  }
  
  isUserOnline = (user) => user.status === 'online' 
  
  render() {
    const { users } = this.state;
    return (
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="mail" /> DIRECT MESSAGES
          </span> {' '}
          ({users.length})
        </Menu.Item>
        {
          users.map(user => (
            <Menu.Item
              key={user.uid}
              onClick={() => console.log(user)}
              style={{ opacity: 0.8, fontStyle: 'italic' }}
            >
              <Icon
                name="circle"
                color={this.isUserOnline(user) ? 'green' : 'red' }
              />
              @ {user.name}
            </Menu.Item>
          ))
        }
      </Menu.Menu>
    );
  }
}

export default DirectMessages;