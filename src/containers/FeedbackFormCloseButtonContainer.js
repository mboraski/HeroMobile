import React, { Component } from 'react';
import { connect } from 'react-redux';

import CloseButton from '../components/CloseButton';

class FeedbackFormCloseButtonContainer extends Component {
    render() {
        const { ...rest } = this.props;
        return <CloseButton {...rest} />;
    }
}

const mapStateToProps = state => ({
    feedbackFormVisible: state.ui.feedbackFormVisible
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedbackFormCloseButtonContainer);
