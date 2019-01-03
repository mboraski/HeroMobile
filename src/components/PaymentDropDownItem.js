// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import Text from './Text';
import Color from '../constants/Color';
import { emY } from '../utils/em';
import mastercard from '../assets/icons/master-card.png';
import visa from '../assets/icons/visa.png';
// import arrowIcon from '../assets/icons/disclosureIndicator.png';
import { selectCard as onPress } from '../actions/paymentActions';

const SIZE = emY(2);

type Props = {
    isHeaderItem: boolean
};

class PaymentDropDownItem extends Component {
    props: Props;

    onSelectCard = () => {
        onPress(this.props.card);
    };

    render() {
        const { isHeaderItem, card } = this.props;
        const { last4, brand } = card;
        // const arrowIconMark = isHeaderItem ?
        //     (<Image source={arrowIcon} style={styles.arrowIcon} />) :
        //     null;
        let paymentIcon = null;
        if (brand === 'Visa') {
            paymentIcon = visa;
        } else if (brand === 'MasterCard') {
            paymentIcon = mastercard;
        }
        const color = isHeaderItem ? Color.YELLOW_600 : 'transparent';
        return (
            <TouchableOpacity
                onPress={this.onSelectCard}
                style={[styles.container, { borderColor: color }]}
                disabled={isHeaderItem}
            >
                <Image
                    source={paymentIcon}
                    style={styles.paymentImage}
                    resizeMode="contain"
                />
                <Text style={styles.paymentNumber}>{last4}</Text>
                {/* {arrowIconMark} */}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: emY(0.89),
        backgroundColor: Color.GREY_100,
        borderColor: Color.YELLOW_600,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    paymentImage: {
        width: emY(2.88),
        height: emY(1.38)
    },
    paymentNumber: {
        fontSize: emY(1.08),
        marginLeft: 10
    }
});

const mapDispatchToProps = {
    onPress
};

export default connect(
    null,
    mapDispatchToProps
)(PaymentDropDownItem);
