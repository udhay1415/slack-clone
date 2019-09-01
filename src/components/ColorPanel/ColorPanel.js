import React from 'react';
import { Sidebar, Menu, Divider, Button } from 'semantic-ui-react';

class ColorPanel extends React.Component {
  render() {
    return (
      <Sidebar
        as={Menu}
        icon="label"
        inverted
        vertical 
        visible 
        width="very thin"
      >
        <Divider />
        <Button icon="add" color="blue" size="small" /> 
      </Sidebar>
    )
  }
}

export default ColorPanel;
