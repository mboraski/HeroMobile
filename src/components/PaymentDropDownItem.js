// Third Party Imports
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

// Relative Imports
import Text from './Text';
import CardImage from '../components/CardImage';
import Color from '../constants/Color';
import { emY } from '../utils/em';

export default function PaymentDropDownItem({
    type,
    brand,
    last4,
    style,
    isHeaderItem,
    id = '',
    onPress = () => {}
}) {
    const selectCard = () => onPress(id);

    const nonHeaderBorder = isHeaderItem
        ? styles.headerBorder
        : styles.nonHeaderBorder;
    return (
        <TouchableOpacity
            onPress={selectCard}
            style={[styles.container, nonHeaderBorder, style]}
        >
            {type ? (
                <CardImage type={type.toLowerCase()} style={styles.card} />
            ) : null}
            <Text style={styles.cardTypeText}>{brand}</Text>
            {last4 && <Text style={styles.cardNumbers}>**** {last4}</Text>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: emY(3),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        backgroundColor: Color.GREY_100
    },
    headerBorder: {
        borderColor: Color.DEFAULT,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    nonHeaderBorder: {
        borderColor: Color.GREY_300,
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
        marginRight: 25,
        color: Color.GREY_800
    }
});
