// 3rd Party Libraries
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

// Relative Imports
import Text from './Text';
import Color from '../constants/Color';
import { emY } from '../utils/em';

export default function Order({ firstName, lastName, ...props }) {
    return (
        <TouchableOpacity {...props} style={[styles.container]}>
            <Text style={styles.text}>{firstName}</Text>
            <Text style={styles.text}>{lastName}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 15,
        backgroundColor: Color.GREY_100,
        borderColor: Color.GREY_300,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    text: {
        flex: 1,
        fontSize: emY(1),
        paddingRight: 10
    }
});
