import React from 'react';
import Colors from 'material-ui/lib/styles/colors';

import Paper from "material-ui/lib/paper";
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from "material-ui/lib/text-field";
import SMS from 'material-ui/lib/svg-icons/notification/sms';

const customStyles = {
    defaultPadding: {
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
    }
};

export default React.createClass({
    displayName: 'PostSender',
    render() {
        return (
            <form style={customStyles.defaultPadding}>
                <TextField
                    hintText="Post a message..."
                    inputStyle={customStyles.postInputStyle}
                    hintStyle={customStyles.postInputHintStyle}
                    underlineStyle={customStyles.postInputUnderlineStyle}
                />
                <RaisedButton
                    label="Send!" primary={true}
                    labelPosition="before"
                    icon={<SMS />}
                    style={customStyles.sendButtonStyle}
                />
            </form>
        );
    }
});
