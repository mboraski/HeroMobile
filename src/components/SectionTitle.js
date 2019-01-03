import React from 'react';
import { StyleSheet } from 'react-native';

import Text from './Text';
import Color from '../constants/Color';
import { emY } from '../utils/em';

export default function SectionTitle({ title, style, ...props }) {
    return (
        <Text {...props} style={[styles.container, style]}>
            {title}
        </Text>
    );
}

const styles = StyleSheet.create({
    container: {
        fontSize: emY(0.8125),
        color: Color.GREY_600,
        paddingHorizontal: 15,
        paddingTop: emY(2.1875),
        paddingBottom: emY(1)
    }
});
