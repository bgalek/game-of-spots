import React from "react";
import ReactDOM from "react-dom";
import App from './components/App'
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap, can go away when react 1.0 release
injectTapEventPlugin();

ReactDOM.render(<App />, document.querySelector('#main'));
