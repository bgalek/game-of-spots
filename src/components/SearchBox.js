import React from "react";
import TextField from "material-ui/lib/text-field";

const customStyles = {
    defaultPadding: {
        padding: '15',
        paddingBottom: '0'
    }
};

export default React.createClass({
    displayName: 'SearchBox',

    handleChange(event){
        this.props.onSubmit(event.target.value);
    },

    handleSearch(event){
        event.preventDefault();
        if (typeof event.target.value !== "undefined") {
            this.props.onSubmit(event.target.value);
        }
    },

    render() {
        return (
            <form style={customStyles.defaultPadding} onSubmit={this.handleSearch}>
                <TextField hintText="Find a spot" onChange={this.handleQuestionChange} fullWidth={true}/>
            </form>
        );
    }
});
