// 3rd Party Libraries
import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

// Relative Imports
import Text from './Text';
import CardImage from '../components/CardImage';
import Color from '../constants/Color';
// import Style from '../constants/Style';
import { emY } from '../utils/em';
import icon from '../assets/icons/keyboard-arrow-right.png';

export default function PaymentMethod({ type, brand, last4, style, ...props }) {
    return (
        <TouchableOpacity {...props} style={[styles.container, style]}>
            {type ? (
                <CardImage type={type.toLowerCase()} style={styles.card} />
            ) : null}
            <Text style={styles.text}>{brand}</Text>
            <Text style={styles.cardNumbers}>**** {last4}</Text>
            <Image source={icon} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
        backgroundColor: Color.GREY_100,
        borderColor: Color.GREY_300,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    card: {
        marginRight: 10
    },
    cardTypeText: {
        flex: 1,
        fontSize: emY(1.1)
    },
    cardNumbers: {
        flex: 1,
        fontSize: emY(1.1),
        textAlign: 'right',
        marginRight: 15,
        color: Color.GREY_800
    }
});
