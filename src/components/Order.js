// 3rd Party Libraries
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

// Relative Imports
import Text from './Text';
import Color from '../constants/Color';
import { emY } from '../utils/em';
import { orderStatuses } from '../constants/Order';

export default function Order({ firstName, lastName, status, ...props }) {
    const satisfiedStyle =
        orderStatuses[status] === 'satisfied'
            ? { backgroundColor: Color.GREY_100 }
            : { backgroundColor: Color.GREY_600 };
    return (
        <TouchableOpacity {...props} style={[styles.container, satisfiedStyle]}>
            <Text style={styles.text}>{firstName}</Text>
            <Text style={styles.text}>{lastName}</Text>
            <Text style={styles.text}>{status}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 15,
        borderColor: Color.GREY_300,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    text: {
        flex: 1,
        fontSize: emY(1),
        paddingRight: 10
    }
});
