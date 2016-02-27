import React from "react";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import RefreshIndicator from "material-ui/lib/refresh-indicator";
import Colors from "material-ui/lib/styles/colors";
import Avatar from "material-ui/lib/avatar";
import chats from "../api/chats";
var moment = require('moment');

const customStyles = {
    myCommentsStyle: {
        borderTopStyle: 'solid',
        borderTopWidth: '3',
        borderTopColor: Colors.red500,
        backgroundColor: Colors.grey100
    }
};

export default React.createClass({
    displayName: 'ChatLog',

    getInitialState(){
        return {
            results: [],
            loading: true
        }
    },

    handleRefresh() {
        chats().chatLog(this.props.chatId).then(response => {
            this.setState({results: response, loading: false});
        }).catch(error => {
            console.log(error);
        });
    },

    componentDidMount() {
        this.handleRefresh();
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
            let {body, from_user, avatar, id, created_at} = result;
            if (from_user.username == this.props.user.username) {
                return (
                    <ListItem key={`${id}`}
                              leftAvatar={<Avatar src={`https://robohash.org/${from_user.username}`} />}
                              primaryText={body}
                              secondaryText={
                                  <p>
                                    {moment(created_at).fromNow()}&nbsp;
                                    <span style={{color: Colors.darkBlack}}>{from_user.username}</span>
                                  </p>
                                }
                              secondaryTextLines={2}
                    />
                )
            } else {
                return (
                    <ListItem key={`${id}`}
                              rightAvatar={<Avatar src={`https://robohash.org/${from_user.username}`} />}
                              primaryText={body}
                              secondaryText={
                                  <p>
                                    {moment(created_at).fromNow()}&nbsp;
                                    <span style={{color: Colors.darkBlack}}>{from_user.username}</span>
                                  </p>
                                }
                              style={customStyles.myCommentsStyle}
                              secondaryTextLines={2}
                    />
                )
            }
        });

        return (
            <List>{results}</List>
        );
    }
});
