import React from "react";
import Paper from "material-ui/lib/paper";
import Tabs from "material-ui/lib/tabs/tabs";
import Tab from "material-ui/lib/tabs/tab";
import TextField from "material-ui/lib/text-field";
import RaisedButton from "material-ui/lib/raised-button";
import SendIcon from "material-ui/lib/svg-icons/content/send";
import IconButton from "material-ui/lib/icon-button";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import ContentInbox from "material-ui/lib/svg-icons/action/touch-app";
import Card from "material-ui/lib/card/card";
import CardMedia from "material-ui/lib/card/card-media";
import CardTitle from "material-ui/lib/card/card-title";
import Colors from "material-ui/lib/styles/colors";
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
    },
    defaultPadding2: {
        padding: '15',
        backgroundColor: Colors.darkBlack,
        color: Colors.white
    },
    sendButtonStyle: {
        float: 'right'
    },
    postInputHintStyle: {
        color: Colors.grey400
    },
    postInputUnderlineStyle: {
        borderColor: Colors.grey400
    },
    postInputStyle: {
        color: Colors.white
    },
    postSenderInputWrapper: {
        display: 'inline-block',
        width: '80%'
    },
    postSenderButtonWrapper: {
        display: 'inline-block',
        textAlign: 'right',
        width: '20%'
    },
    sendPostIcon: {
        color: Colors.red500,
        fill: Colors.red500
    }
};

export default React.createClass({

    displayName: 'Chat',
    logInterval: null,

    contextTypes: {
        router: React.PropTypes.object
    },

    getInitialState: function () {
        return {
            tab: 'ask',
            distance: 'calculating distance...',
            chatDetails: {},
            question: '',
            chatLog: [],
            loading: true
        }
    },

    handleTabChange: function (value) {
        if (typeof value == "string") { //whyyy?
            this.setState({
                tab: value
            });
        }
    },

    componentWillMount(){
        chats().join(this.props.params.chatId, this.props.route.user.username).then(response => {
        }).catch(error => {
            // TODO: display a dialog maybe?
            console.log(error);
        });
        navigator.geolocation.getCurrentPosition(position => this.calculateDistance(position.coords.latitude, position.coords.longitude, this.state.chatDetails.geo_location))
    },

    componentDidMount() {
        this.fetchChatDetails();
        this.fetchChatLog();
        this.logInterval = setInterval(this.fetchChatLog, 2000);
    },

    componentWillUnmount(){
        clearInterval(this.logInterval)
    },

    fetchChatLog: function () {
        chats().chatLog(this.props.params.chatId).then(response => {
            this.setState({chatLog: response, loading: false})
        }).catch(error => {
            console.log(error);
        });
    },

    fetchChatDetails: function () {
        chats().withId(this.props.params.chatId).then(response => {
            this.setState({chatDetails: response, loading: false})
        }).catch(error => {
            console.log(error);
        });
    },

    predefinedTextSubmit: function (event) {
        chats().ask(this.props.params.chatId, event.target.innerHTML, this.props.route.user.username).then(response => {
            this.setState({question: ''});
        });
    },

    calculateDistance(lat1, lon1, latlon2) {
        if (latlon2 === "undefined") {
            this.setState({"distance": "unavailable"});
        } else {
            let radlat1 = Math.PI * lat1 / 180;
            let radlat2 = Math.PI * latlon2[0] / 180;
            let theta = lon1 - latlon2[1];
            let radtheta = Math.PI * theta / 180;
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344;
            this.setState({"distance": Math.round(dist * 100) / 100 + " km"});
        }
    },

    handleQuestionSubmit(event){
        event.preventDefault();
        chats().ask(this.props.params.chatId, this.state.question, this.props.route.user.username).then(response => {
            this.setState({question: ''});
        });
    },

    handleQuestionChange(event){
        this.setState({
            question: event.target.value
        });
    },

    handleMessageSubmit(event){
        event.preventDefault();
        chats().sendMessage(this.props.params.chatId, this.state.message, this.props.route.user.username).then(response => {
            this.fetchChatLog();
            this.setState({message: ''});
        });
    },

    handleMessageChange(event){
        this.setState({
            message: event.target.value
        });
    },

    render() {
        return (
            <div>
                <Card>
                    <CardMedia
                        overlay={<CardTitle title={this.state.chatDetails.name} subtitle={this.state.distance} />}
                        style={customStyles.cardMediaPhotoWrapper}>
                        <img src={this.state.chatDetails.image}/>
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
                                <ListItem onTouchTap={this.predefinedTextSubmit} primaryText="Are there any free spots there right now?" rightIcon={<ContentInbox />}/>
                                <ListItem onTouchTap={this.predefinedTextSubmit} primaryText="How long will I wait for service?" rightIcon={<ContentInbox />}/>
                                <ListItem onTouchTap={this.predefinedTextSubmit} primaryText="Are the waitresses pretty?" rightIcon={<ContentInbox />}/>
                            </List>
                        </Paper>
                    </Tab>
                    <Tab label="Chat" value="chat">
                        <ChatLog chatLog={this.state.chatLog} chatId={this.props.params.chatId} user={this.props.route.user}/>
                        <form style={customStyles.defaultPadding2} onSubmit={this.handleMessageSubmit}>
                            <div style={customStyles.postSenderInputWrapper}>
                                <TextField
                                    hintText="Post a message..."
                                    fullWidth={true}
                                    value={this.state.message}
                                    onChange={this.handleMessageChange}
                                    inputStyle={customStyles.postInputStyle}
                                    hintStyle={customStyles.postInputHintStyle}
                                    underlineStyle={customStyles.postInputUnderlineStyle}
                                />
                            </div>
                            <div style={customStyles.postSenderButtonWrapper}>
                                <IconButton iconStyle={customStyles.sendPostIcon}>
                                    <SendIcon />
                                </IconButton>
                            </div>
                        </form>
                    </Tab>
                </Tabs>
            </div>
        );
    }
});
