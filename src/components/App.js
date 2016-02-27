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

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import CustomTheme from '../CustomTheme';

export default React.createClass({
    displayName: 'App',

    getInitialState: function () {
        return {open: false};
    },

    childContextTypes : {
        muiTheme: React.PropTypes.object,
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(CustomTheme),
        };
    },

    handleToggle() {
        this.setState({open: !this.state.open});
    },

    handleGoTo(route) {
        this.setState({open: !this.state.open});
        this.refs.router.router.push(route);
    },

    render() {
        return (
            <div className="app">
                <AppBar title="Game of Spots" onTouchTap={this.handleToggle} onLeftIconButtonTouchTap={this.handleToggle}/>
                <LeftNav docked={false} width={200} open={this.state.open} onRequestChange={open => this.setState({open})}>
                    <MenuItem onTouchTap={this.handleGoTo.bind(this, '/')}>Chats</MenuItem>
                    <MenuItem onTouchTap={this.handleGoTo.bind(this, '/about')}>About</MenuItem>
                </LeftNav>
                <Router ref="router" history={hashHistory}>
                    <Route path="/" component={Chats}/>
                    <Route path="/chats/:chatId" component={Chat}/>
                    <Route path="/chats/:chatId/question/:questionId" component={Answer}/>
                    <Route path="/about" component={About}/>
                    <Route path="*" component={Error404}/>
                </Router>
            </div>
        );
    }
});
