import React from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import firebase from '../../firebase';

class UserPanel extends React.Component {
  state = { user: this.props.user }
  dropdownOptions = () => [
    {
      key: 'user',
      text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
      disabled: true
    },
    {
      key: 'avatar',
      text: <span>Change Avatar</span>
    },
    {
      key: 'logout',
      text: <span onClick={this.handleSignout}>Log out</span>
    }
  ]
  
  handleSignout = () => {
    firebase.auth().signOut().then(() => console.log('signout'))
  }
  
  render() {
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.5em' }}>
            <Header
              inverted
              floating="left"
              as="h2"
            >
              <Icon name="chat" />
              <Header.Content>MAD Chat</Header.Content>
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Header
              style={{ padding: '1.2em'}}
              inverted
              as="h3"
            >
              <Dropdown 
                trigger={
                  <span>
                    <Image src={'https://avatars.slack-edge.com/2015-12-17/16957173431_30721f31797e3ebc8cde_512.png'} avatar spaced='right'/>
                    {this.state.user.displayName}
                  </span>} 
                options={this.dropdownOptions()} 
              />
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }  
}

export default connect(mapStateToProps)(UserPanel);
