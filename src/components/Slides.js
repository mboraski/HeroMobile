import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

import Text from './Text';
import Dimensions from '../constants/Dimensions';
import Style from '../constants/Style';

class Slides extends Component {
    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return (
                <Button
                    title="Onwards!"
                    raised
                    buttonStyle={styles.buttonStyle}
                    onPress={this.props.onComplete}
                    fontFamily={'goodtimes'}
                    accessibilityLabel="Leave tutorial screens and go to app"
                />
            );
        }
    }

    renderSlides() {
        return this.props.data.map((slide, index) => (
            <View
                key={slide.text}
                style={[styles.slideStyle, { backgroundColor: slide.color }]}
            >
                <Text
                    style={[
                        Style.headerTitle,
                        Style.headerTitleLogo,
                        styles.textStyle
                    ]}
                >
                    {slide.text}
                </Text>
                {this.renderLastSlide(index)}
            </View>
        ));
    }

    render() {
        return (
            <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.window.width
    },
    textStyle: {
        fontSize: 30,
        color: 'black',
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: '#000',
        marginTop: 15
    }
};

export default Slides;
