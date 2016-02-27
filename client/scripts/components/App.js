import React from "react";
import {Router, Route, hashHistory} from "react-router";
import AppBar from "material-ui/lib/app-bar";
import Chats from "./Chats";
import Chat from "./Chat";
import Error404 from "./Error404";
import About from "./About";
import LeftNav from "material-ui/lib/left-nav";
import MenuItem from "material-ui/lib/menus/menu-item";

export default React.createClass({
    displayName: 'App',

    getInitialState: function () {
        return {open: false};
    },

    handleToggle() {
        this.setState({open: !this.state.open});
    },

    handleGoToHome() {
        this.setState({open: !this.state.open});
    },

    render() {
        return (
            <div className="app">
                <AppBar title="Game of Spots" onClick={this.handleToggle} onLeftIconButtonTouchTap={this.handleToggle}/>
                <LeftNav docked={false} width={200} open={this.state.open} onRequestChange={open => this.setState({open})}>
                    <MenuItem onClick={this.handleGoToHome} onTouchTap={this.handleGoToHome}>Chats</MenuItem>
                    <MenuItem onClick={this.handleToggle} onTouchTap={this.handleToggle}>About</MenuItem>
                </LeftNav>
                <Router history={hashHistory}>
                    <Route path="/" component={Chats}/>
                    <Route path="/chats/:chatId" component={Chat}/>
                    <Route path="/about" component={About}/>
                    <Route path="*" component={Error404}/>
                </Router>
            </div>
        );
    }
});
