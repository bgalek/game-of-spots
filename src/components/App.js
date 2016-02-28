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
import FlatButton from "material-ui/lib/flat-button";

var LocalStorageMixin = require('react-localstorage');

export default React.createClass({
    displayName: 'App',
    mixins: [LocalStorageMixin],
    modalInterval: null,

    getDefaultProps: function () {
        return {
            stateFilterKeys: ['user']
        };
    },

    getInitialState: function () {
        return {
            user: null,
            leftNavVisible: false,
            showPrivateQuestionDialog: false,
            privateQuestion: {body: null}
        }
    },

    componentDidUpdate(){
        if (this.state.user == null) {
            chats().register().then(response => {
                this.setState({user: response});
            });
        }
    },

    componentDidMount() {
        this.modalInterval = setInterval(this.tryToshowModal, 1000);
    },

    tryToshowModal() {
        chats().chatPrivateLog("piwpaw", this.state.user.username).then(response => {
            console.log('privates:', response);
            //response = response.filter(it => it.was_seen == false);
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

    answerQuestion() {
        chats().markAsSeen(this.state.privateQuestion.id).then(response => {
            console.log('marked as seen:', this.state.privateQuestion.id)
        }).catch(error => {
            console.log(error);
        });
        this.setState({showPrivateQuestionDialog: false, privateQuestion: {body : null}});
        this.modalInterval = setInterval(this.tryToshowModal, 1000);
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

    render() {
        if (this.state.user !== null) {

            const actions = [
                <FlatButton
                    label="Answer"
                    secondary={true}
                    onTouchTap={this.answerQuestion}
                />
            ];

            return (
                <div className="app">
                    <AppBar title="Spotcheck" onTouchTap={this.handleToggle} onLeftIconButtonTouchTap={this.handleToggle}/>
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
                        title="New Question!"
                        modal={true}
                        actions={actions}
                        open={this.state.showPrivateQuestionDialog}>
                        {this.state.privateQuestion.body}
                    </Dialog>
                </div>
            );
        } else {
            return (<div>loading...</div>)
        }
    }
});
