import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// eslint-disable-next-line import/no-unresolved
import cartIcon from '../assets/icons/cart.png';
import { emY } from '../utils/em';

const SIZE = emY(2.1875);

class CartButton extends Component {
    onPress = () => {
        this.props.navigation.navigate('cart');
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
        marginRight: 20
    },
    image: {
        width: SIZE,
        height: SIZE
    }
});

const mapDispatchToProps = function(dispatch) {
    return {};
};

export default connect(
    null,
    mapDispatchToProps
)(CartButton);
