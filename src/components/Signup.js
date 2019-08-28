import React, { Component } from 'react';
import { Grid, Header, Form, Segment, Button, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

class Signup extends Component {
  constructor() {
    super();
    this.state = { username: '', email: '', password: '', passwordConfirmation: '' }
  }
  
  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  submitHandler = event => {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }
  
  renderDisableValue = () => {
    if (this.isEmptyForm() === true) {
      return true;
    } else if (this.renderPasswordValidation() === false) {
      return true;
    } else {
      return false;
    }
  }
  
  isEmptyForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    if (username.length !== 0 && email.length !== 0 && password.length !== 0 && passwordConfirmation.length !== 0) {
      return false;
    } else {
      return true;
    }
  }
  
  renderPasswordValidation = () => {
    const { password, passwordConfirmation } = this.state;
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  }
  
  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="center" className="app">
        <Grid.Column style={{ maxWidth: 400 }}>
          <Header as="h2" icon color="black" textAlign="center">
            <Icon name="chat" color="teal" />
            Signup
          </Header>
          <Form size="small" onSubmit={this.submitHandler}>
            <Segment>
              <Form.Input 
                fluid
                value={username}
                name="username" 
                placeholder="Username" 
                icon="user" 
                iconPosition="left" 
                onChange={this.onChangeHandler}
                type="text"
              />
              <Form.Input 
                fluid
                value={email}
                name="email" 
                placeholder="Email" 
                icon="mail" 
                iconPosition="left" 
                onChange={this.onChangeHandler}
                type="email"
              />
              <Form.Input 
                fluid
                value={password}
                name="password" 
                placeholder="Password" 
                icon="lock" 
                iconPosition="left" 
                onChange={this.onChangeHandler}
                type="password"
              />
              <Form.Input 
                fluid
                value={passwordConfirmation}
                name="passwordConfirmation" 
                placeholder="Password Confirmation" 
                icon="repeat" 
                iconPosition="left" 
                onChange={this.onChangeHandler}
                type="password"
              />
              <Button fluid size="small" color="teal" disabled={this.renderDisableValue()}>SIGNUP</Button>
            </Segment>
          </Form>
          <Message>Already an user? <Link to="/login">Login</Link></Message>
        </Grid.Column>  
      </Grid>
    )
  }
}

export default Signup;