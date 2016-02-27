import React from 'react';
import Paper from 'material-ui/lib/paper';
import TextField from "material-ui/lib/text-field";
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Divider from 'material-ui/lib/divider';
import Colors from 'material-ui/lib/styles/colors';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

const customStyles = {
    defaultPadding: {
        padding: '15'
    },
    topMarginSmall: {
        marginTop: '5'
    },
    inputPaperWrapperStyle: {
        padding: '15'
    },
    questionInputStyle: {
        textAlign: 'center',
        fontSize: 20
    },
    cardMediaPhotoWrapper: {
        height: '150',
        overflow: 'hidden'
    },
    cardHeader: {
        height: '56',
        paddingBottom: '0',
        textAlign: 'center',
        backgroundColor: Colors.grey100
    },
    cardTextAuthor: {
        height: '50',
        textAlign: 'center',
        paddingTop: '5',
        paddingBottom: '0',
        backgroundColor: Colors.grey100
    },
    cardTextAuthorName: {
        fontSize: 16,
        color: Colors.pink500,
        fontWeight: '900'
    },
    cardTextAuthorSubtitle: {
        fontSize: 14,
        color: Colors.grey500,
        fontWeight: '400'
    },
    cardTextQuestion: {
        textAlign: 'center',
        fontSize: 16
    }
};

export default React.createClass({
    displayName: 'Answer',
    contextTypes: {
        router: React.PropTypes.object
    },
    backToChat(chatId, event) {
        this.context.router.push(`/chats/${chatId}`);
    },
    render() {
        return (
            <div className="app-chat">
                <Card>
                    <CardMedia
                        overlay={<CardTitle title="Multitap PiwPaw" subtitle="0.2km away from you" />}
                        style={customStyles.cardMediaPhotoWrapper}
                    >
                        <img src="http://lorempixel.com/600/337/nature/"/>
                    </CardMedia>
                    <CardHeader
                        avatar="http://lorempixel.com/100/100/nature/"
                        style={customStyles.cardHeader}
                    />
                    <CardText style={customStyles.cardTextAuthor}>
                        <div style={customStyles.cardTextAuthorName}>Stevie Wonder</div>
                        <div style={customStyles.cardTextAuthorSubtitle}>asked...</div>
                    </CardText>
                    <CardText style={customStyles.cardTextQuestion}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi?
                    </CardText>
                </Card>
                <div style={customStyles.defaultPadding}>
                    <TextField
                        hintText="Your answer"
                        fullWidth={true}
                        style={customStyles.questionInputStyle}
                    />
                    <RaisedButton
                        label="Send!" secondary={true}
                        fullWidth={true}
                    />
                    <RaisedButton
                        label="I am not there / I don't know"
                        fullWidth={true}
                        style={customStyles.topMarginSmall}
                        onTouchTap={this.backToChat.bind(this, 1)}
                        onClick={this.backToChat.bind(this, 1)}
                    />
                </div>
            </div>
        );
    }
});
