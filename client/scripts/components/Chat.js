import React from "react";
import Paper from "material-ui/lib/paper";
import Tabs from "material-ui/lib/tabs/tabs";
import Tab from "material-ui/lib/tabs/tab";
import TextField from "material-ui/lib/text-field";
import Divider from "material-ui/lib/divider";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import ContentInbox from "material-ui/lib/svg-icons/content/inbox";
import Card from "material-ui/lib/card/card";
import CardMedia from "material-ui/lib/card/card-media";
import CardTitle from "material-ui/lib/card/card-title";
import Avatar from "material-ui/lib/avatar";
import Colors from "material-ui/lib/styles/colors";
import chats from "../api/chats";

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

    getInitialState: function () {
        return {
            tab: 'ask',
            distance: 'calculating distance...',
            result: {}
        }
    },

    handleTabChange: function (value) {
        this.setState({
            tab: value
        });
    },

    componentDidMount() {
        chats().withId(this.props.params.chatId).then(response => {
            this.setState({result: response, loading: false})
        }).catch(error => {
            console.log(error);
        })
        navigator.geolocation.getCurrentPosition(position => this.calculateDistance(position.coords.latitude, position.coords.longitude, this.state.result.geo_location[0], this.state.result.geo_location[1]))
    },

    calculateDistance(lat1, lon1, lat2, lon2) {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lon1 - lon2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        this.setState({"distance": Math.round(dist * 100) / 100 + " km"});
    },

    render() {
        return (
            <div>
                <Card>
                    <CardMedia overlay={<CardTitle title={this.state.result.name} subtitle={this.state.distance} />}>
                        <img src="http://lorempixel.com/600/337/nature/"/>
                    </CardMedia>
                </Card>
                <Tabs>
                    <Tab label="Chat">
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
                                <ListItem
                                    rightAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg" />}
                                    primaryText="Brunch this weekend?"
                                    secondaryText={
                                  <p>
                                    <span style={{color: Colors.darkBlack}}>Brendan Lim</span> --
                                    I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                                  </p>
                                }
                                    secondaryTextLines={10}
                                />
                            </List>
                        </div>
                    </Tab>
                    <Tab label="Ask a question">
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
                                <ListItem primaryText="Is the spot crowded right now?" rightIcon={<ContentInbox />}/>
                                <ListItem primaryText="Is the spot crowded right now?" rightIcon={<ContentInbox />}/>
                                <ListItem primaryText="Is the spot crowded right now?" rightIcon={<ContentInbox />}/>
                            </List>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
});
