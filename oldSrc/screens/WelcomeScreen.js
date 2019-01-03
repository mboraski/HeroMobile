import _ from 'lodash';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';

import { statusBarOnly } from '../constants/Style';
import Slides from '../components/Slides';
import { setFirstTimeOpened } from '../actions/uiActions';

const SLIDE_DATA = [
    { text: 'Welcome to Hasty', color: '#F5A623' },
    { text: 'Just sign up and set your location', color: '#F5A623' },
    { text: 'Now start accelerating your life!', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
    static navigationOptions = statusBarOnly;

    onSlidesComplete = () => {
        this.props.setFirstTimeOpened();
        this.props.navigation.navigate('apiTester');
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
