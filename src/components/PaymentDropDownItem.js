// Third Party Imports
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    Text,
} from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import Color from '../constants/Color';
import { emY } from '../utils/em';
import paymentIcon from '../assets/icons/master-card.png';
import arrowIcon from '../assets/icons/disclosureIndicator.png';

const SIZE = emY(2);

type Props = {
    isHeaderItem: boolean
};

class PaymentDropDownItem extends Component {
    props: Props;

    render() {
        const { isHeaderItem } = this.props;
        const arrowIconMark = isHeaderItem ? 
            (<Image source={arrowIcon} style={styles.arrowIcon} />) :
            null;
        const color = isHeaderItem ?
            Color.YELLOW_600 : 'transparent';
        return (
            <TouchableOpacity 
                onPress={this.onPress} 
                style={[styles.container, { borderColor: color }]} 
                disabled={isHeaderItem}
            >
                <Image
                    source={paymentIcon}
                    style={styles.paymentImage}
                    resizeMode="contain"
                />
                <Text style={styles.paymentNumber}>***3463</Text>
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
        height: emY(1.38),
    },
    paymentNumber: {
        fontSize: emY(1.08),
        marginLeft: 10
    },

});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(PaymentDropDownItem);
