// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';

// Relative Imports
import Prediction from '../components/Prediction';

class PredictionList extends Component {
    renderPrediction = (prediction, index) => {
        const onPress = () => this.props.selectPrediction(prediction);
        return (
            <Prediction key={index} prediction={prediction} onPress={onPress} />
        );
    };

    render() {
        const { predictions, style, ...props } = this.props;
        return (
            <Animated.ScrollView
                {...props}
                style={[styles.container, style]}
                keyboardDismissMode="on-drag"
            >
                {predictions.map(this.renderPrediction)}
            </Animated.ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default PredictionList;
