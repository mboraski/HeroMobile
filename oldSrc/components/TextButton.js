import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

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
