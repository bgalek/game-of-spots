import React from 'react';

const customStyles = {
    defaultPadding: {
        padding: '15'
    }
}

export default React.createClass({
    displayName: 'About',
    render() {
        return (
            <div style={customStyles.defaultPadding}>
                <p>
                    About the project.
                </p>
            </div>
        );
    }
});
