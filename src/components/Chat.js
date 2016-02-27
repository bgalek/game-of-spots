import React from "react";
import Paper from "material-ui/lib/paper";
import Tabs from "material-ui/lib/tabs/tabs";
import Tab from "material-ui/lib/tabs/tab";
import TextField from "material-ui/lib/text-field";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import ContentInbox from "material-ui/lib/svg-icons/action/touch-app";
import Card from "material-ui/lib/card/card";
import CardMedia from "material-ui/lib/card/card-media";
import CardTitle from "material-ui/lib/card/card-title";
import Colors from "material-ui/lib/styles/colors";
import RaisedButton from "material-ui/lib/raised-button";
import PostSender from "./PostSender";
import ChatLog from "./ChatLog";
import chats from "../api/chats";

const customStyles = {
    defaultPadding: {
        padding: '15'
    },
    questionInputStyle: {
        fontSize: 20,
        marginBottom: '7'
    },
    questionListHeading: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: Colors.red500,
        margin: '0'
    }
};

export default React.createClass({

    displayName: 'Chat',

    contextTypes: {
        router: React.PropTypes.object
    },

    getInitialState: function () {
        return {
            tab: 'ask',
            distance: 'calculating distance...',
            result: {},
            question: '',
            chatLog: [],
            loading: true
        }
    },

    handleTabChange: function (value) {
        this.setState({
            tab: value
        });
    },

    componentDidMount() {
        chats().withId(this.props.params.chatId).then(response => {
            this.setState({result: response, loading: false})
        }).catch(error => {
            console.log(error);
        });

        navigator.geolocation.getCurrentPosition(position => this.calculateDistance(position.coords.latitude, position.coords.longitude, this.state.result.geo_location[0], this.state.result.geo_location[1]))

        chats().chatLog(this.props.params.chatId).then(response => {
            this.setState({chatLog: response, loading: false})
        }).catch(error => {
            console.log(error);
        });
    },

    calculateDistance(lat1, lon1, lat2, lon2) {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lon1 - lon2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        this.setState({"distance": Math.round(dist * 100) / 100 + " km"});
    },

    handleQuestionSubmit(event){
        event.preventDefault();

        chats().sendMessage(this.props.params.chatId, this.state.question, this.props.route.user).then(response => {
            console.log(response);
            console.log('posted!');
        });
    },

    handleQuestionChange(event){
        this.setState({
            question: event.target.value
        });
    },

    render() {
        return (
            <div>
                <Card>
                    <CardMedia
                        overlay={<CardTitle title={this.state.result.name} subtitle={this.state.distance} />}
                        style={customStyles.cardMediaPhotoWrapper}>
                        <img src={this.state.result.image}/>
                    </CardMedia>
                </Card>
                <Tabs value={this.state.tab} onChange={this.handleTabChange}>
                    <Tab label="Ask a question" value="ask">
                        <form style={customStyles.defaultPadding} onSubmit={this.handleQuestionSubmit}>
                            <TextField
                                hintText="Ask any question..."
                                fullWidth={true}
                                inputStyle={customStyles.questionInputStyle}
                                value={this.state.question}
                                onChange={this.handleQuestionChange}
                                style={customStyles.questionInputStyle}
                            />
                            <RaisedButton
                                label="Send!"
                                secondary={true}
                                fullWidth={true}
                                onClick={this.handleQuestionSubmit}
                            />
                        </form>
                        <Paper style={customStyles.defaultPadding} zDepth={1}>
                            <h3 style={customStyles.questionListHeading}>
                                Or pick a question...
                            </h3>
                            <List>
                                <ListItem primaryText="Are there any free spots there right now?" rightIcon={<ContentInbox />}/>
                                <ListItem primaryText="How long will I wait for service?" rightIcon={<ContentInbox />}/>
                                <ListItem primaryText="Are the waitresses pretty?" rightIcon={<ContentInbox />}/>
                            </List>
                        </Paper>
                    </Tab>
                    <Tab label="Chat" value="chat">
                        <ChatLog chatId={this.props.params.chatId} user={this.props.route.user}/>
                        <PostSender/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
});
