import React from 'react';
import Colors from 'material-ui/lib/styles/colors';

import Paper from "material-ui/lib/paper";
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from "material-ui/lib/text-field";
import SMS from 'material-ui/lib/svg-icons/notification/sms';
import IconButton from 'material-ui/lib/icon-button';

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
    },
    postSenderInputWrapper: {
        display: 'inline-block',
        width: '80%'
    },
    postSenderButtonWrapper: {
        display: 'inline-block',
        textAlign: 'right',
        width: '20%'
    },
    sendPostIcon: {
        color: Colors.yellow500,
        fill: Colors.yellow500
    }
};

export default React.createClass({
    displayName: 'PostSender',
    render() {
        return (
            <form style={customStyles.defaultPadding}>
                <div style={customStyles.postSenderInputWrapper}>
                    <TextField
                        hintText="Post a message..."
                        fullWidth={true}
                        inputStyle={customStyles.postInputStyle}
                        hintStyle={customStyles.postInputHintStyle}
                        underlineStyle={customStyles.postInputUnderlineStyle}
                    />
                </div>
                <div style={customStyles.postSenderButtonWrapper}>
                    <IconButton iconStyle={customStyles.sendPostIcon}>
                        <SMS />
                    </IconButton>
                </div>
            </form>
        );
    }
});
