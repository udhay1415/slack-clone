import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';
import Channels from './Channels';
import DirectMessages from '../Messages/DirectMessages';

class SidePanel extends React.Component {
  render() {
    return (
      <Menu
        size="huge"
        inverted
        fixed="left" 
        vertical
        style={{ fontSize: '1.2rem', backgroundColor: '#01579B' }}
      >
        <UserPanel />
        <Channels />
        <DirectMessages user={this.props.user}/>

      </Menu>
    )
  }
}

export default SidePanel;
