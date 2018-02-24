import React, { Component } from 'react';
import { connect } from 'react-redux';

import CloseButton from '../components/CloseButton';

export class FeedbackFormCloseButton extends Component {
    render() {
        const { feedbackFormVisible, ...rest } = this.props;
        if (feedbackFormVisible) {
            return <CloseButton {...rest} />;
        }
        return null;
    }
}

const mapStateToProps = state => ({ feedbackFormVisible: state.ui.feedbackFormVisible });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackFormCloseButton);
