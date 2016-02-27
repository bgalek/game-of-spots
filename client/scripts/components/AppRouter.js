import React from "react";
import {Router, Route, browserHistory} from "react-router";
import Chats from "./Chats";
import Chat from "./Chat";
import Error404 from "./Error404";

export default React.createClass({
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Chats}>
                    <Route path="/chats/:chatId" component={Chat}/>
                    <Route path="*" component={Error404}/>
                </Route>
            </Router>
        )
    }
});
