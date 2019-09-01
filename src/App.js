import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from "react-redux";
import "./App.css";

import ColorPanel from './components/ColorPanel/ColorPanel';
import SidePanel from './components/SidePanel/SidePanel';
import Messages from './components/Messages/Messages';
import MetaPanel from './components/MetaPanel/MetaPanel';

const App = ({ user, currentChannel }) => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <ColorPanel />
    <SidePanel key={user && user.uid} user={user}/>

    <Grid.Column style={{ marginLeft: 320, marginRight: 10 }}>
      <Messages 
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        user={user}
      />
    </Grid.Column>

  </Grid>
);

const mapStateToProps = state => ({
  user: state.auth.user,
  currentChannel: state.channel.currentChannel
});

export default connect(mapStateToProps)(App);
