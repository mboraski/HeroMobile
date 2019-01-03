import React, { Component } from 'react';
import { connect } from 'react-redux';

import { statusBarOnly } from '../constants/Style';
import Slides from '../components/Slides';
import { setFirstTimeOpened } from '../actions/uiActions';

const SLIDE_DATA = [
    {
        text:
            'Welcome to Hasty, the FASTEST delivery network ever! Swipe left to continue!',
        color: '#F5A623'
    },
    {
        text:
            'Just sign up, set your location, and fill your cart up with products. Swipe left to continue!',
        color: '#fff'
    },
    {
        text:
            'Light a beacon and a Hero will arrive with your products shortly!',
        color: '#F5A623'
    }
];

class WelcomeScreen extends Component {
    static navigationOptions = statusBarOnly;

    onSlidesComplete = () => {
        this.props.setFirstTimeOpened();
        this.props.navigation.navigate('auth');
    };

    render() {
        return <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />;
    }
}

const mapDispatchToProps = {
    setFirstTimeOpened
};

export default connect(
    null,
    mapDispatchToProps
)(WelcomeScreen);
