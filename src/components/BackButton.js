// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { closeToggle } from '../actions/navigationActions';
import { emY } from '../utils/em';
import leftArrowIcon from '../assets/icons/left-arrow.png';

const SIZE = emY(1.25);

class BackButton extends Component {
    onBackPress = () => {
        this.props.onPress();
    };

    render() {
        const { style, ...props } = this.props;
        return (
            <TouchableOpacity 
                {...props} 
                style={[styles.container, style]}
                onPress={this.onBackPress}
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

const mapStateToProps = state => ({
    isMenuOpen: state.header.isMenuOpen
});

const mapDispatchToProps = dispatch => ({
    closeToggle: () => dispatch(closeToggle())
});

export default connect(mapStateToProps, mapDispatchToProps)(BackButton);
