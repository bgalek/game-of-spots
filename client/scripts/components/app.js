import React from "react";
import AppBar from "material-ui/lib/app-bar";
import Avatar from "material-ui/lib/avatar";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import Divider from "material-ui/lib/divider";
import CommunicationChatBubble from "material-ui/lib/svg-icons/communication/chat";

export default React.createClass({
    displayName: 'App',

    render() {
        return (
            <div className="app">
                <AppBar title="Game of Spots"/>
                <List subheader="Available spots">
                    <ListItem
                        primaryText="Brendan Lim"
                        leftAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg" />}
                        rightIcon={<CommunicationChatBubble />}
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
                <Divider />
                <List subheader="Previous chats">
                    <ListItem
                        primaryText="Chelsea Otakan"
                        leftAvatar={<Avatar src="http://www.material-ui.com/images/chexee-128.jpg" />}
                    />
                    <ListItem
                        primaryText="James Anderson"
                        leftAvatar={<Avatar src="http://www.material-ui.com/images/jsa-128.jpg" />}
                    />
                </List>
            </div>
        );
    }
});
