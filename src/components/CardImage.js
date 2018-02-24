import React from 'react';
import { Image, StyleSheet } from 'react-native';

import bankAmericaIcon from '../assets/icons/bank-america.png';
import masterCardIcon from '../assets/icons/master-card.png';
import visaIcon from '../assets/icons/visa.png';
import paypalIcon from '../assets/icons/paypal.png';

const VISA = 'visa';
const MASTERCARD = 'master-card';
const AMERICAN_EXPRESS = 'american-express';
const DINERS_CLUB = 'diners-club';
const DISCOVER = 'discover';
const JCB = 'jcb';
const UNIONPAY = 'unionpay';
const MAESTRO = 'maestro';
// not supported
const BANK_AMERICA = 'bank-america';

const sources = {
    [BANK_AMERICA]: bankAmericaIcon,
    [MASTERCARD]: masterCardIcon,
    // [AMERICAN_EXPRESS]: americanExpressIcon,
    // [DINERS_CLUB]: dinersClubIcon,
    // [DISCOVER]: discoverIcon,
    // [JCB]: jcbIcon,
    // [UNIONPAY]: unionpayIcon,
    // [MAESTRO]: maestroIcon,
    [VISA]: visaIcon,
    // discover: discoverIcon,
    // maestro: maestroIcon,
    paypal: paypalIcon
};

const CardImage = ({ type, style, ...props }) => (
    <Image {...props} source={sources[type]} style={[styles.image, style]} resizeMode="contain" />
);

const styles = StyleSheet.create({
    image: {
        alignSelf: 'center',
        width: 50
    }
});

export default CardImage;
