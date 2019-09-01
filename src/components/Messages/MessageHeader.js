import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

class MessageHeader extends React.Component {
  render() {
    return (
      <Segment clearing style={{ marginTop: 10 }}>
        {/* Channel Title */}
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            # {this.props.currentChannel.name}{" "}
            <Icon name={"star outline"} color="black" size="small" />
          </span>
          <Header.Subheader>{this.props.numUniqueUsers}</Header.Subheader>
        </Header>

        {/* Channel Search Input */}
        <Header floated="right">
          <Input
            onChange={this.props.handleChange}
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
          />
        </Header>
      </Segment>
    );
  }
}

export default MessageHeader;
