import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default ({ style, ...rest }) => (
    <Text style={[styles.text, style]} {...rest} />
);

const styles = StyleSheet.create({
    text: {
        fontFamily: 'roboto'
    }
});
