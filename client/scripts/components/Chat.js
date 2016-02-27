import React from "react";
import Paper from 'material-ui/lib/paper';

import Tabs from "material-ui/lib/tabs/tabs";
import Tab from "material-ui/lib/tabs/tab";
import TextField from "material-ui/lib/text-field";
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';

const customStyles = {
    inputPaperWrapperStyle: {
        padding: '15'
    },
    questionInputStyle: {
        textAlign: 'center',
        fontSize: 20
    }
};

export default React.createClass({
    displayName: 'Chat',

    getInitialState: function() {
        return {
            tab: 'ask'
        }
    },

    handleTabChange: function(value) {
        this.setState({
            tab: value,
        });
    },

    render() {
        return (
            <div className="app-chat">
                <Card>
                  <CardMedia
                    overlay={<CardTitle title="Multitap PiwPaw" subtitle="200m away" />}
                  >
                    <img src="http://lorempixel.com/600/337/nature/" />
                  </CardMedia>
                </Card>
                <Tabs
                  value={this.state.tab}
                  onChange={this.handleTabChange}
                >
                    <Tab label="Chat" value="chat">
                        <div>
                            <List>
                              <ListItem
                                leftAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg" />}
                                primaryText="Brunch this weekend?"
                                secondaryText={
                                  <p>
                                    <span style={{color: Colors.darkBlack}}>Brendan Lim</span> --
                                    I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                                  </p>
                                }
                                secondaryTextLines={2}
                              />
                              <Divider inset={true} />
                              <ListItem
                                leftAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg" />}
                                primaryText="Brunch this weekend?"
                                secondaryText={
                                  <p>
                                    <span style={{color: Colors.darkBlack}}>Brendan Lim</span> --
                                    I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                                  </p>
                                }
                                secondaryTextLines={2}
                              />
                            </List>
                        </div>
                    </Tab>
                    <Tab label="Ask a question" value="ask">
                        <div>
                            <Paper style={customStyles.inputPaperWrapperStyle} zDepth={1}>
                                <TextField
                                    hintText="Ask any question..."
                                    fullWidth={true}
                                    style={customStyles.questionInputStyle}
                                />
                            </Paper>
                            <Divider/>
                            <p>
                                Or pick a question...
                            </p>
                            <List>
                                <ListItem primaryText="Is the spot crowded right now?" rightIcon={<ContentInbox />} />
                                <ListItem primaryText="Is the spot crowded right now?" rightIcon={<ContentInbox />} />
                                <ListItem primaryText="Is the spot crowded right now?" rightIcon={<ContentInbox />} />
                            </List>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
});
