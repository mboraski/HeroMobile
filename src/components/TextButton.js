import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Text from './Text';

const TextButton = ({ title, style, ...rest }) => (
    <TouchableOpacity {...rest} style={[styles.container, style]}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        marginRight: 20
    },
    text: {
        fontSize: 16
    }
});

export default TextButton;
