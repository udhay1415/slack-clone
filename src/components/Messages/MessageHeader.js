import React from "react";
import { Header, Segment, Input } from "semantic-ui-react";

class MessageHeader extends React.Component {
  render() {
    return (
      <Segment clearing style={{ marginTop: 10 }}>
        {/* Channel Title */}
        {
          this.props.currentChannel ? (
            <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
              <span>
                {
                  this.props.isPrivateChannel === false ? (
              `# ${this.props.currentChannel.name} `
                  ) : `@ ${this.props.currentChannel.name} `
                }
              </span>
              {
                this.props.isPrivateChannel === false ? (
                  <Header.Subheader>{this.props.numUniqueUsers}</Header.Subheader>
                ) : null
              }
            </Header>
          ) : null
        }


        {/* Channel Search Input */}
        <Header floated="right">
          <Input
            onChange={this.props.handleChange}
            loading={this.props.searchLoading}
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
