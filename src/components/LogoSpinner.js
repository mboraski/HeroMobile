import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Color from '../constants/Color';
import Spinner from '../components/Spinner';

export default class LogoSpinner extends Component {
    render() {
        const { ringStyle, imageContainerStyle, imageStyle, ...rest } = this.props;
        return (
            <Spinner
                ringStyle={[styles.spinnerRing, ringStyle]}
                imageContainerStyle={[styles.spinnerImageContainer, imageContainerStyle]}
                imageStyle={[styles.spinnerImage, imageStyle]}
                {...rest}
            />
        );
    }
}

const styles = StyleSheet.create({
    spinnerRing: { borderColor: 'transparent' },
    spinnerImageContainer: { backgroundColor: Color.YELLOW_600 },
    spinnerImage: { width: '90%', height: '90%' }
});
