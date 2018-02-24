import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import Color from '../constants/Color';
import addressIcon from '../assets/icons/logo-orange.png';
import { emY } from '../utils/em';

const ICON_SIZE = emY(2);

const Prediction = ({ prediction, style, ...props }) => (
    <TouchableOpacity {...props} style={[styles.container, style]}>
        <Image source={addressIcon} style={styles.icon} resizeMode="contain" />
        <Text style={styles.text}>{prediction.description}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 35,
        paddingVertical: emY(0.9),
        alignItems: 'center',
        borderColor: Color.GREY_300,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    icon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        marginRight: 15 
    },
    text: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: emY(1)
    }
});

export default Prediction;
