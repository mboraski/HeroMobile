import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

import Dimensions from '../constants/Dimensions';

class Slides extends Component {
    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return (
                <Button
                    title="Onwards!"
                    raised
                    buttonStyle={styles.buttonStyle}
                    onPress={this.props.onComplete}
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
                <Text style={styles.textStyle}>{slide.text}</Text>
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
        color: 'white',
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: '#8AD835',
        marginTop: 15
    }
};

export default Slides;
