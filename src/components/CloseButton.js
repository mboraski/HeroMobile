// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import closeIcon from '../assets/icons/close.png';

import { HEADER_ITEM_SIZE } from '../constants/Style';

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
        marginLeft: 20
    },
    image: {
        width: HEADER_ITEM_SIZE,
        height: HEADER_ITEM_SIZE
    }
});

const mapDispatchToProps = function(dispatch) {
    return {};
};

export default connect(
    null,
    mapDispatchToProps
)(CloseButton);
