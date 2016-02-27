import React from "react";
import Avatar from "material-ui/lib/avatar";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import CommunicationChatBubble from "material-ui/lib/svg-icons/communication/chat";
import RefreshIndicator from "material-ui/lib/refresh-indicator";
import SearchBox from "./SearchBox";
import Colors from 'material-ui/lib/styles/colors';
import chats from "../api/chats";

export default React.createClass({
    displayName: 'Chats',

    getInitialState(){
        return {
            results: [],
            loading: true
        }
    },

    handleRefresh(query) {
        if (typeof query !== "undefined") {
            chats().withPartialName(query).then(response => {
                this.setState({results: response, loading: false});
            }).catch(error => {
                console.log(error);
            })
        } else {
            chats().all().then(response => {
                this.setState({results: response, loading: false});
            }).catch(error => {
                console.log(error);
            })
        }
    },

    componentDidMount() {
        this.handleRefresh();
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
                    display: 'block',
                    position: 'relative',
                    margin: '0 auto'
                },
            };
            return <RefreshIndicator
                size={70}
                left={0}
                top={60}
                loadingColor={Colors.red500}
                status="loading"
                style={style.refresh}
            />
        }

        let results = this.state.results.map(result => {
            let {slug_name, name, avatar} = result;
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
                <SearchBox onSubmit={this.handleRefresh}/>
                <List subheader="Available spots">{results}</List>
            </div>
        )
    }
});
