import React, { Component } from 'react';
import { Grid, Header, Form, Segment, Button, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

class Signup extends Component {
  constructor() {
    super();
    this.state = { username: '', email: '', password: '', passwordConfirmation: '', errors: [], loading: false, usersRef: firebase.database().ref('users') }
  }
  
  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  submitHandler = event => {
    if(this.isFormValid()) {
      event.preventDefault(); // prevents default actions of refreshing the browser
      this.setState({ loading: true, errors: [] });
      // Create user
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(res => {
        // Add user - Update profile
        res.user.updateProfile({
          displayName: this.state.username,
        }).then(() => {
          this.saveUser(res).then(() => {
            this.setState({ loading: false });
            console.log('user saved');
          })
        }).catch(err => {
          this.setState({ loading: false, errors: this.state.errors.concat(err) })
        })
      }).catch(err => {
        this.setState({ loading: false, errors: this.state.errors.concat(err) });
      })
    }
  }
  
  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty() === true) {
      error = { message: 'Input fields are empty' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (this.isPasswordValid() === false) {
      error = { message: 'Invalid Password' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  }
  
  isFormEmpty = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    if (username.length !== 0 && email.length !== 0 && password.length !== 0 && passwordConfirmation.length !== 0) {
      return false;
    } else {
      return true;
    }
  }
  
  isPasswordValid = () => {
    const { password, passwordConfirmation } = this.state;
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  }
  
  displayErrors = errors => (
    errors.map((error, index) => <p key={index}>{error.message}</p>)
  )
  
  handleInputErrors = (errors, input) => {
    return errors.some(error => error.message.toLowerCase().includes(input)) ? "error" : ""
  }
  
  saveUser = (createdUser) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName
    })
  }
  
  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 400 }}>
          <Header as="h2" icon color="black" textAlign="center">
            <Icon name="chat" color="teal" />
            Sign up to MAD Chat
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
                className={this.handleInputErrors(this.state.errors, "username")}
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
                className={this.handleInputErrors(this.state.errors, "email")}
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
                className={this.handleInputErrors(this.state.errors, "password")}
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
                className={this.handleInputErrors(this.state.errors, "password")}
              />
              <Button fluid size="small" color="teal" loading={this.state.loading} className={this.state.loading ? 'loading' : ''} >SIGNUP</Button>
            </Segment>
          </Form>
          {
            this.state.errors.length > 0 ? (
              <Message error>
                <h3>Error</h3>
                {this.displayErrors(this.state.errors)}
              </Message>
            ): null
          }
          <Message>Already an user? <Link to="/login">Login</Link></Message>
        </Grid.Column>  
      </Grid>
    )
  }
}

export default Signup;