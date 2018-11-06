// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import times from 'lodash/times';

import fillIcon from '../assets/icons/star-fill.png';
import emptyIcon from '../assets/icons/star-empty.png';

export default class BackButton extends Component {
    static defaultProps = {
        ratingCount: 5,
        value: 0,
        size: 30,
        fillImage: fillIcon,
        emptyImage: emptyIcon
    };

    handleRating = rating => {
        this.props.onChange(rating);
    };

    renderRating = index => {
        const { value, size, fillImage, emptyImage, ratingStyle } = this.props;
        const rating = index + 1;
        const source = value >= rating ? fillImage : emptyImage;
        const onPress = () => this.handleRating(rating);
        return (
            <TouchableOpacity key={index} onPress={onPress}>
                <Image
                    source={source}
                    style={[
                        styles.rating,
                        { width: size, height: size },
                        ratingStyle
                    ]}
                />
            </TouchableOpacity>
        );
    };

    render() {
        const { style, ratingCount } = this.props;
        return (
            <View style={[styles.container, style]}>
                {times(ratingCount, this.renderRating)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    rating: {
        marginRight: 10
    }
});
