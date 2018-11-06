// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { emY } from '../utils/em';
import closeIcon from '../assets/icons/close.png';

const SIZE = emY(1.25);

class CloseButton extends Component {
    render() {
        const { style, ...props } = this.props;
        return (
            <TouchableOpacity {...props} style={[styles.container, style]}>
                <Image
                    source={closeIcon}
                    style={styles.image}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    }
}

// TODO: remove display none when X functionality implemented
const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        display: 'none'
    },
    image: {
        width: SIZE,
        height: SIZE
    }
});

const mapDispatchToProps = function(dispatch) {
    return {};
};

export default connect(
    null,
    mapDispatchToProps
)(CloseButton);
