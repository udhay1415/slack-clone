import React, { Component } from 'react';
import { Grid, Header, Form, Segment, Button, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

class Login extends Component {
  constructor() {
    super();
    this.state = { email: '', password: '', errors: [], loading: false }
  }
  
  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  submitHandler = event => {
    if(this.isFormValid()) {
      event.preventDefault(); // prevents default actions of refreshing the browser
      this.setState({ loading: true, errors: [] });
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(res => {
        console.log(res);
        this.setState({ loading: false });
      }).catch(err => {
        console.log(err);
        this.setState({ loading: false });
        this.setState({ errors: this.state.errors.concat(err) });
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
    } else {
      return true;
    }
  }
  
  isFormEmpty = () => {
    const { email, password } = this.state;
    if (email.length !== 0 && password.length !== 0) {
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
  
  render() {
    const { email, password } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 400 }}>
          <Header as="h2" icon color="black" textAlign="center">
            <Icon name="chat" color="teal" />
            Log in
          </Header>
          <Form size="small" onSubmit={this.submitHandler}>
            <Segment>
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
              <Button fluid size="small" color="teal" loading={this.state.loading} className={this.state.loading ? 'loading' : ''} >LOGIN</Button>
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
          <Message>Don't have an account? <Link to="/signup">Signup</Link></Message>
        </Grid.Column>  
      </Grid>
    )
  }
}

export default Login;