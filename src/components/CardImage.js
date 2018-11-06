import React from 'react';
import { Image, StyleSheet } from 'react-native';

import masterCardIcon from '../assets/icons/cc-mastercard.png';
import visaIcon from '../assets/icons/cc-visa.png';
import americanExpressIcon from '../assets/icons/cc-amex.png';
import dinersClubIcon from '../assets/icons/cc-diners.png';
import discoverIcon from '../assets/icons/cc-discover.png';
import jcbIcon from '../assets/icons/cc-jcb.png';
import maestroIcon from '../assets/icons/cc-maestro.png';

const VISA = 'visa';
const MASTERCARD = 'master-card';
const AMERICAN_EXPRESS = 'american-express';
const DINERS_CLUB = 'diners-club';
const DISCOVER = 'discover';
const JCB = 'jcb';
const MAESTRO = 'maestro';

const sources = {
    [MASTERCARD]: masterCardIcon,
    [AMERICAN_EXPRESS]: americanExpressIcon,
    [DINERS_CLUB]: dinersClubIcon,
    [DISCOVER]: discoverIcon,
    [JCB]: jcbIcon,
    [MAESTRO]: maestroIcon,
    [VISA]: visaIcon
};

const CardImage = ({ type, style, ...props }) => (
    <Image
        {...props}
        source={sources[type]}
        style={[styles.image, style]}
        resizeMode="contain"
    />
);

const styles = StyleSheet.create({
    image: {
        alignSelf: 'center',
        width: 50
    }
});

export default CardImage;
