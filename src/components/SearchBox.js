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

    getInitialState(){
        return {
            value: ''
        }
    },

    handleChange(event){
        this.setState({
            value: event.target.value
        });
    },

    handleSearch(event){
        event.preventDefault();
        this.props.onSubmit(this.state.value);
    },

    render() {
        return (
        <form style={customStyles.defaultPadding} onSubmit={this.handleSearch}>
            <TextField hintText="Find a spot" value={this.state.value} onChange={this.handleChange} fullWidth={true}/>
        </form>
        );
    }
});
