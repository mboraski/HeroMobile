import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

// eslint-disable-next-line import/no-unresolved
import cartIcon from '../assets/icons/cart.png';

import { HEADER_ITEM_SIZE } from '../constants/Style';

class CartButton extends Component {
    onPress = () => {
        this.props.navigation.navigate('checkout');
    };

    render() {
        return (
            <TouchableOpacity onPress={this.onPress} style={styles.container}>
                <Image
                    source={cartIcon}
                    style={styles.image}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginRight: 20 - HEADER_ITEM_SIZE * 0.3
    },
    image: {
        width: HEADER_ITEM_SIZE * 1.3,
        height: HEADER_ITEM_SIZE * 1.3
    }
});

export default withNavigation(CartButton);
