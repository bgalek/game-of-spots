import React from "react";
import Avatar from "material-ui/lib/avatar";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import CommunicationChatBubble from "material-ui/lib/svg-icons/communication/chat";

export default React.createClass({
    displayName: 'Chats',

    contextTypes: {
        router: React.PropTypes.object
    },

    handleChatClick(chatId, event) {
        this.context.router.push(`/chats/${chatId}`);
    },

    render() {
        return (
            <div>
                <List subheader="Available spots">
                    <ListItem
                        id="test1"
                        primaryText="Brendan Lim"
                        leftAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg" />}
                        rightIcon={<CommunicationChatBubble />}
                        onTouchTap={this.handleChatClick.bind(this, 'testRoom')}
                        onClick={this.handleChatClick.bind(this, 'testRoom')}
                    />
                    <ListItem
                        id="test2"
                        primaryText="Brendan Lim"
                        leftAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg" />}
                        rightIcon={<CommunicationChatBubble />}
                        onTouchTap={this.handleChatClick.bind(this, 'testRoom')}
                        onClick={this.handleChatClick.bind(this, 'testRoom')}
                    />
                    <ListItem
                        id="test3"
                        primaryText="Brendan Lim"
                        leftAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg" />}
                        rightIcon={<CommunicationChatBubble />}
                        onTouchTap={this.handleChatClick.bind(this, 'testRoom')}
                        onClick={this.handleChatClick.bind(this, 'testRoom')}
                    />
                    <ListItem
                        id="test4"
                        primaryText="Brendan Lim"
                        leftAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg" />}
                        rightIcon={<CommunicationChatBubble />}
                        onTouchTap={this.handleChatClick.bind(this, 'testRoom')}
                        onClick={this.handleChatClick.bind(this, 'testRoom')}
                    />
                    <ListItem
                        id="test5"
                        primaryText="Brendan Lim"
                        leftAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg" />}
                        rightIcon={<CommunicationChatBubble />}
                        onTouchTap={this.handleChatClick.bind(this, 'testRoom')}
                        onClick={this.handleChatClick.bind(this, 'testRoom')}
                    />
                </List>
            </div>
        );
    }
});
