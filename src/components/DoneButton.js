// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { emY } from '../utils/em';
import Color from '../constants/Color';

const SIZE = emY(1);

class DoneButton extends Component {
    render() {
        const { style, ...props } = this.props;
        return (
            <TouchableOpacity {...props} style={[styles.container, style]}>
                <Text style={styles.text}>Done</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginRight: 20
    },
    text: {
        fontSize: SIZE,
        color: Color.BLACK
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(DoneButton);
