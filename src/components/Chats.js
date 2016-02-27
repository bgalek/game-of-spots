import React from "react";
import Avatar from "material-ui/lib/avatar";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import CommunicationChatBubble from "material-ui/lib/svg-icons/communication/chat";
import RefreshIndicator from "material-ui/lib/refresh-indicator";
import TextField from "material-ui/lib/text-field";
import chats from "../api/chats";

const customStyles = {
    defaultPadding: {
        padding: '15',
        paddingBottom: '0'
    }
}

export default React.createClass({
    displayName: 'Chats',

    getInitialState(){
        return {
            results: [],
            loading: true
        }
    },

    componentWillReceiveProps(nextProps){
        this.setState({loading: true});
    },

    componentDidMount() {
        chats().all().then(response => {
            function toListItems(response) {
                return Object.keys(response).map(item => {
                    return response[item];
                });
            }

            this.setState({results: toListItems(response), loading: false})
        }).catch(error => {
            console.log(error);
        })
    },

    contextTypes: {
        router: React.PropTypes.object
    },

    handleChatClick(chatId, event) {
        this.context.router.push(`/chats/${chatId}`);
    },

    render() {
        if (this.state.loading) {
            let style = {
                container: {
                    position: 'relative',
                },
                refresh: {
                    display: 'inline-block',
                    position: 'relative',
                },
            };
            return <RefreshIndicator
                size={50}
                left={70}
                top={150}
                loadingColor={"#FF9800"}
                status="loading"
                style={style.refresh}
            />
        }

        let results = this.state.results.map(result => {
            let {slug_name, name, avatar, image} = result;
            return (
                <ListItem
                    key={`${slug_name}`}
                    primaryText={`${name}`}
                    leftAvatar={<Avatar src={avatar} />}
                    rightIcon={<CommunicationChatBubble />}
                    onTouchTap={this.handleChatClick.bind(this, slug_name)}
                />
            )
        });

        return (
            <div>
                <div style={customStyles.defaultPadding}>
                    <TextField
                        hintText="Find a spot"
                        fullWidth={true}
                    />
                </div>
                <List subheader="Available spots">{results}</List>
            </div>
        )
    }
});
