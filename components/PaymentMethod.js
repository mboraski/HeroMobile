// 3rd Party Libraries
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

// Relative Imports
import CardImage from '../components/CardImage';
import Color from '../constants/Color';
import { emY } from '../utils/em';
import icon from '../assets/icons/keyboard-arrow-right.png';

export default function PaymentMethod({ type, text, style, ...props }) {
    return (
        <TouchableOpacity {...props} style={[styles.container, style]}>
            {type ? <CardImage type={type} style={styles.card} /> : null}
            <Text style={styles.text}>{text}</Text>
            <Image source={icon} style={styles.icon} />
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
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    card: {
        marginRight: 10
    },  
    text: {
        flex: 1,
        fontSize: emY(1),
    },
    icon: {
        
    }
});
