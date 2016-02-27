import React from "react";
import { Router, Route, Link } from 'react-router'

import App from 'App'
import Chat from 'Chat'
import Error404 from 'Error404'

export default React.createClass({
    render((
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="/chats/:chatId" component={Chat}/>
          <Route path="*" component={Error404}/>
        </Route>
      </Router>
    ), document.body)
});
