import React, { Component } from 'react';
import { Grid, Header, Form, Segment, Buton, Message, Icon } from 'semantic-ui-react';

class Login extends Component {
  render() {
    return (
      <Grid textAlign="center" verticalAlign="center">
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h1" icon color="blue" textAlign="center">
            <Icon name="chat" color="blue" />
            Register
          </Header>
        </Grid.Column>  
      </Grid>
    )
  }
}

export default Login;
