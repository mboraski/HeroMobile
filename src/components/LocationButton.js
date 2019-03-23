import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

import Color from '../constants/Color';
import { HEADER_ITEM_SIZE } from '../constants/Style';

import { emY } from '../utils/em';

const SIZE = emY(1);

class LocationButton extends Component {
    render() {
        const { style, ...props } = this.props;
        return (
            <Icon
                {...props}
                name="navigation"
                size={SIZE}
                containerStyle={[styles.iconContainer, style]}
                iconStyle={styles.icon}
                raised
            />
        );
    }
}

const styles = StyleSheet.create({
    iconContainer: {
        margin: 0,
        marginRight: 20 - (HEADER_ITEM_SIZE - SIZE),
        backgroundColor: Color.GREY_100,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 1
            },
            android: {
                elevation: 4
            }
        })
    },
    icon: {
        margin: 0,
        color: Color.GREY_700,
        transform: [
            {
                rotate: '45deg'
            }
        ]
    }
});

export default LocationButton;
