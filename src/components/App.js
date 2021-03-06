import React from "react";
import {Router, Route, hashHistory} from "react-router";
import AppBar from "material-ui/lib/app-bar";
import Chats from "./Chats";
import Chat from "./Chat";
import Error404 from "./Error404";
import About from "./About";
import Answer from "./Answer";
import LeftNav from "material-ui/lib/left-nav";
import MenuItem from "material-ui/lib/menus/menu-item";
import ThemeManager from "material-ui/lib/styles/theme-manager";
import CustomTheme from "../CustomTheme";
import chats from "../api/chats";
import Dialog from "material-ui/lib/dialog";
import TextField from "material-ui/lib/text-field";
import RaisedButton from "material-ui/lib/raised-button";
import Colors from "material-ui/lib/styles/colors";
import FlatButton from "material-ui/lib/flat-button";

const customStyles = {
    defaultPadding: {
        padding: '15'
    },
    questionInputStyle: {
        fontSize: 20,
        marginBottom: '7'
    },
    chatNameHeading: {
        fontSize: 14,
        fontWeight: '400',
        textTransform: 'uppercase',
        color: Colors.grey900,
        margin: '0'
    },
    chatNameHeadingOriginalBody: {
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: Colors.red500,
        margin: '0'
    }
};

export default React.createClass({
    displayName: 'App',
    modalInterval: null,

    getInitialState: function () {
        return {
            user: null,
            leftNavVisible: false,
            showPrivateQuestionDialog: false,
            privateQuestion: {body: null, chat: {name: null}},
            responseMessage: ''
        }
    },

    componentDidMount() {
        this.modalInterval = setInterval(this.tryToshowModal, 3000);
    },

    tryToshowModal() {
        chats().chatPrivateLog(this.state.user.username).then(response => {
            response = response.filter(it => it.was_seen == false);
            if (response.length > 0) {
                this.setState({privateQuestion: response[0]})
            }
        }).catch(error => {
            console.log(error);
        });

        if (this.state.privateQuestion.body != null) {
            clearInterval(this.modalInterval);
            this.setState({showPrivateQuestionDialog: true});
        }
    },

    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(CustomTheme),
        };
    },

    handleToggle() {
        this.setState({leftNavVisible: !this.state.leftNavVisible});
    },

    handleGoTo(route) {
        this.setState({leftNavVisible: !this.state.leftNavVisible});
        this.refs.router.router.push(route);
    },

    handleAnswer(event){
        event.preventDefault();
        if (typeof event.target.value !== "undefined" && event.target.value !== '') {
            this.answerQuestion(event.target.value);
        }
    },

    handleAnswerSubmit(event){
        event.preventDefault();
        if (this.state.responseMessage !== undefined && this.state.responseMessage !== '') {
            chats().answer(this.state.privateQuestion.id, this.state.responseMessage).then(response => {
                this.setState({responseMessage: ''});
            }).catch(error => {
                console.log(error);
            });
            this.setState({showPrivateQuestionDialog: false, privateQuestion: {body: null, chat: {name: null}}});
            this.modalInterval = setInterval(this.tryToshowModal, 3000);
        }
    },

    handleAnswerChange(event){
        this.setState({
            responseMessage: event.target.value
        });
    },

    handleMarkAsSeen(event) {
        event.preventDefault();
        chats().markAsSeen(this.state.privateQuestion.id).then(response => {
            console.log(response);
            console.log('answer marked as seen:', this.state.privateQuestion.id)
        }).catch(error => {
            console.log(error);
        });
        this.setState({showPrivateQuestionDialog: false, privateQuestion: {body: null, chat: {name: null}}});
    },

    render() {
        if (this.state.user !== null) {

            const actionsAnswer = [
                <RaisedButton
                    label="Answer"
                    secondary={true}
                    onTouchTap={this.handleAnswerSubmit}
                />
            ];

            const actionsNotify = [
                <RaisedButton
                    label="Thank you!"
                    primary={true}
                    onTouchTap={this.handleMarkAsSeen}
                />
            ];

            console.log(this.state.user);

            let dialog;

            if(this.state.privateQuestion.is_response) {
                dialog = (
                    <div>
                        <h2 style={customStyles.chatNameHeadingOriginalBody}>{this.state.privateQuestion.original_body}</h2>
                        <h3 style={customStyles.chatNameHeading}>{this.state.privateQuestion.body}</h3>
                    </div>
                );
            } else {
                dialog = (
                    <div>
                        <h3 style={customStyles.chatNameHeading}>{this.state.privateQuestion.body}</h3>
                        <form onSubmit={this.handleAnswerSubmit}>
                            <TextField
                                hintText="Your answer..."
                                fullWidth={true}
                                value={this.state.responseMessage}
                                onChange={this.handleAnswerChange}
                                inputStyle={customStyles.questionInputStyle}
                            />
                        </form>
                    </div>
                );
            }

            return (
                <div className="app">
                    <AppBar title="Spotcheck"
                            onLeftIconButtonTouchTap={this.handleToggle}
                            iconElementRight={<FlatButton label={this.state.user.username} />}/>
                    <LeftNav docked={false} width={200} open={this.state.leftNavVisible} onRequestChange={leftNavVisible => this.setState({leftNavVisible})}>
                        <MenuItem onTouchTap={this.handleGoTo.bind(this, '/')}>Available spots</MenuItem>
                        <MenuItem onTouchTap={this.handleGoTo.bind(this, '/about')}>About</MenuItem>
                    </LeftNav>
                    <Router ref="router" history={hashHistory}>
                        <Route path="/" component={Chats}/>
                        <Route path="/chats/:chatId" component={Chat} user={this.state.user}/>
                        <Route path="/chats/:chatId/question/:questionId" component={Answer}/>
                        <Route path="/about" component={About}/>
                        <Route path="*" component={Error404}/>
                    </Router>
                    <Dialog
                        title={this.state.privateQuestion.chat.name}
                        modal={true}
                        actions={this.state.privateQuestion.is_response ? actionsNotify : actionsAnswer}
                        open={this.state.showPrivateQuestionDialog}>
                        {dialog}
                    </Dialog>
                </div>
            );
        } else {
            chats().register().then(response => {
                console.log('brak usera, loading..')
                this.setState({user: response});
            });
            return (<div>loading...</div>)
        }
    }
});
