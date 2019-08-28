import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'semantic-ui-css/semantic.min.css'


// Router
const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} /> 
      <Route path="/signup" component={Signup} />               
    </Switch>
  </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
