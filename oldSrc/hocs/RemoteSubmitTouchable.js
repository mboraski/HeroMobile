import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

const mapDispatchToProps = {
    submit
};

const createRemoteSubmitTouchable = Comp => {
    class RemoteSubmitTouchable extends Component {
        handlePress = () => {
            this.props.submit(this.props.formName);
        };

        render() {
            return <Comp {...this.props} onPress={this.handlePress} />;
        }
    }
    return connect(
        null,
        mapDispatchToProps
    )(RemoteSubmitTouchable);
};

export default createRemoteSubmitTouchable;
