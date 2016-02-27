import React from "react";
import AppBar from "material-ui/lib/app-bar";
import Avatar from "material-ui/lib/avatar";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import CommunicationChatBubble from "material-ui/lib/svg-icons/communication/chat";

export default React.createClass({
    displayName: 'Chats',

    goTo(){
        console.log('goto')
    },

    render() {
        return (
            <div>
                <AppBar title="Game of Spots"/>
                <List subheader="Available spots">
                    <ListItem
                        primaryText="Brendan Lim"
                        leftAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg" />}
                        rightIcon={<CommunicationChatBubble />}
                        onTouchTap={this.goTo}
                    />
                    <ListItem
                        primaryText="Eric Hoffman"
                        leftAvatar={<Avatar src="http://www.material-ui.com/images/kolage-128.jpg" />}
                        rightIcon={<CommunicationChatBubble />}
                    />
                    <ListItem
                        primaryText="Grace Ng"
                        leftAvatar={<Avatar src="http://www.material-ui.com/images/uxceo-128.jpg" />}
                        rightIcon={<CommunicationChatBubble />}
                    />
                    <ListItem
                        primaryText="Kerem Suer"
                        leftAvatar={<Avatar src="http://www.material-ui.com/images/kerem-128.jpg" />}
                        rightIcon={<CommunicationChatBubble />}
                    />
                    <ListItem
                        primaryText="Raquel Parrado"
                        leftAvatar={<Avatar src="http://www.material-ui.com/images/raquelromanp-128.jpg" />}
                        rightIcon={<CommunicationChatBubble />}
                    />
                </List>
            </div>
        );
    }
});
