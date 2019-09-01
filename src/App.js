import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from "react-redux";
import "./App.css";

import SidePanel from './components/SidePanel/SidePanel';
import Messages from './components/Messages/Messages';

const App = ({ user, currentChannel, isPrivateChannel }) => (
  <Grid columns="equal" className="app" style={{ background: "#fff" }}>
    <SidePanel key={user && user.uid} user={user} isPrivateChannel={isPrivateChannel}/>

    <Grid.Column style={{ marginLeft: 320, marginRight: 10 }}>
      <Messages 
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        user={user}
        isPrivateChannel={isPrivateChannel}
      />
    </Grid.Column>

  </Grid>
);

const mapStateToProps = state => ({
  user: state.auth.user,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel
});

export default connect(mapStateToProps)(App);
