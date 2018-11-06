// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

// Relative Imports
import { emY } from '../utils/em';
import leftArrowIcon from '../assets/icons/left-arrow.png';

const SIZE = emY(1.5);

class ToggleBackButton extends Component {
    render() {
        const { style, ...props } = this.props;
        return (
            <TouchableOpacity
                {...props}
                style={[styles.container, style]}
                onPress={() => this.props.navigation.closeDrawer()}
            >
                <Image
                    source={leftArrowIcon}
                    style={styles.image}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20
    },
    image: {
        width: SIZE,
        height: SIZE
    }
});

export default ToggleBackButton;
