import React from "react";
import {Router, Route, hashHistory} from "react-router";
import AppBar from "material-ui/lib/app-bar";
import Chats from "./Chats";
import Chat from "./Chat";
import Error404 from "./Error404";
import About from "./About";

export default React.createClass({
    displayName: 'Error404',
    render() {
        return (
            <div className="app">
                <AppBar title="Game of Spots"/>
                <Router history={hashHistory}>
                    <Route path="/" component={Chats}/>
                    {/* add the routes here */}
                    <Route path="/chats/:chatId" component={Chat}/>
                    <Route path="/about" component={About}/>
                    <Route path="*" component={Error404}/>
                </Router>
            </div>
        );
    }
});
