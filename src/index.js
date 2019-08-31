import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import reducers from './reducers';
import Login from './components/Login';
import Signup from './components/Signup';
import App from './App';
import history from './History';
import * as serviceWorker from './serviceWorker';
import { userCheck } from './actions';
import { Loader, Dimmer } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css'

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

const Spinner = () => (
  <Dimmer active>
    <Loader size="huge" content={"Loading messages..."} />
  </Dimmer>
)

class Root extends React.Component {
  
  componentDidMount() {
    store.dispatch(userCheck());
  }
  
  render() {
    return this.props.loading ? <Spinner  /> : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} /> 
        <Route path="/signup" component={Signup} />               
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loading: state.auth.loading
  }
}

const RootWithAuth = connect(mapStateToProps, {})(Root)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
