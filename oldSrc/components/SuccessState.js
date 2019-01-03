import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import successIcon from '../assets/icons/success.png';
import { emY } from '../utils/em';

const SIZE = emY(7);

export default class Spinner extends Component {
    opacity = new Animated.Value(0);

    componentDidMount() {
        this.animate();
    }

    animate = () => {
        Animated.sequence([
            Animated.timing(this.opacity, {
                toValue: 1,
                duration: 500
            }),
            Animated.delay(100)
        ]).start(this.props.onAnimationEnd);
    };

    render() {
        const { style } = this.props;
        return (
            <View style={[styles.container, style]}>
                <Animated.Image
                    source={successIcon}
                    style={[styles.image, { opacity: this.opacity }]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: SIZE,
        height: SIZE
    }
});
