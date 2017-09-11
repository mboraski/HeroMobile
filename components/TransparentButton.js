// Third Party Imports
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Relative Imports
import { emY } from '../utils/em';

const SIZE = emY(1.25);

const BackButton = () => <View style={styles.container} />;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        width: SIZE,
        height: SIZE
    }
});

export default BackButton;
