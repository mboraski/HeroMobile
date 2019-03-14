import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Animated } from 'react-native';

import Text from './Text';
import Color from '../constants/Color';
import Dimensions from '../constants/Dimensions';
import { emY } from '../utils/em';
import onboardingScreenSetLocation from '../assets/onboardingScreenSetLocation.png';
import onboardingScreenCheckout from '../assets/onboardingScreenCheckout.png';
import onboardingScreenLightBeacon from '../assets/onboardingScreenLightBeacon.png';
import onboardingScreenNotificationsCommunications from '../assets/onboardingScreenNotificationsCommunications.png';
import onboardingScreenGift from '../assets/onboardingScreenGift.png';

const WINDOW_WIDTH = Dimensions.window.width;
const slideImages = {
    0: onboardingScreenSetLocation,
    1: onboardingScreenCheckout,
    2: onboardingScreenLightBeacon,
    3: onboardingScreenNotificationsCommunications,
    4: onboardingScreenGift
};

class Slides extends Component {
    scrollX = new Animated.Value(0); // this will be the scroll location of our ScrollView

    renderSlides() {
        return this.props.data.map((slide, index) => (
            <View style={styles.slideStyle} key={slide.text}>
                <Image
                    source={slideImages[index]}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={[styles.textTitleStyle]}>{slide.textTitle}</Text>
                <Text style={[styles.textStyle]}>{slide.text}</Text>
            </View>
        ));
    }

    renderDots() {
        const position = Animated.divide(this.scrollX, WINDOW_WIDTH);

        return this.props.data.map((slide, i) => {
            const opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
            });
            return <Animated.View key={i} style={[{ opacity }, styles.dots]} />;
        });
    }

    render() {
        return (
            <View>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { x: this.scrollX } } }
                    ])}
                    scrollEventThrottle={16}
                >
                    {this.renderSlides()}
                </ScrollView>
                <View style={styles.dotsWrapper}>{this.renderDots()}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    slideStyle: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: WINDOW_WIDTH,
        paddingHorizontal: 20
    },
    slideScrollView: {
        flex: 1
    },
    textTitleStyle: {
        fontSize: emY(1.8),
        color: Color.DEFAULT,
        textAlign: 'center',
        marginTop: emY(0.4),
        marginBottom: emY(0.2)
    },
    textStyle: {
        fontSize: emY(1.6),
        color: Color.GREY_700,
        textAlign: 'center'
    },
    image: {
        width: emY(15),
        height: emY(15)
    },
    dotsWrapper: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: emY(1),
        marginBottom: emY(0.8)
    },
    dots: {
        height: emY(0.6),
        width: emY(0.6),
        backgroundColor: Color.GREY_700,
        margin: emY(0.5),
        borderRadius: emY(0.3)
    }
});

export default Slides;
