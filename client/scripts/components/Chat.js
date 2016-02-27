import React from "react";
import Tabs from "material-ui/lib/tabs/tabs";
import Tab from "material-ui/lib/tabs/tab";
import TextField from "material-ui/lib/text-field";

export default React.createClass({
    displayName: 'Chat',

    // default props
    // constructor(props) {
    //     this.state = {
    //         value: 'chat',
    //     };
    // },

    handleChange(value) {
        this.setState({
            value: value,
        });
    },

    render() {
        return (
            <div className="app-chat">
                <TextField
                    hintText="Hint Text"
                />
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="Chat" value="chat">
                        <div>
                            <p>
                                Tabs are also controllable if you want to programmatically pass them their values.
                                This allows for more functionality in Tabs such as not
                                having any Tab selected or assigning them different values.
                            </p>
                        </div>
                    </Tab>
                    <Tab label="Ask a question" value="ask">
                        <div>
                            <p>
                                This is another example of a controllable tab. Remember, if you
                                use controllable Tabs, you need to give all of your tabs values or else
                                you wont be able to select them.
                            </p>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
});
