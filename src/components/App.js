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

var LocalStorageMixin = require('react-localstorage');

export default React.createClass({
    displayName: 'App',
    mixins: [LocalStorageMixin],

    getDefaultProps: function() {
        return {
            stateFilterKeys: ['user']
        };
    },

    getInitialState: function () {
        return {
            user: null,
            leftNavVisible: false
        }
    },

    componentDidUpdate(){
        if (this.state.user == null) {
            chats().register().then(response => {
                this.setState({user: response});
            });
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

    render() {
        if (this.state.user !== null) {
            return (
                <div className="app">
                    <AppBar title="Game of Spots" onTouchTap={this.handleToggle} onLeftIconButtonTouchTap={this.handleToggle}/>
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
                </div>
            );
        } else {
            return (<div/>)
        }
    }
});
