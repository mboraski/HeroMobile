// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { emY } from '../utils/em';
import brandIcon from '../assets/icons/brand.png';

const SIZE = emY(2);

class BrandButton extends Component {
    onPress = () => {};

    render() {
        return (
            <TouchableOpacity onPress={this.onPress} style={styles.container}>
                <Image
                    source={brandIcon}
                    style={styles.image}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                top: -10
            }
        }),
        marginLeft: 20
    },
    image: {
        width: SIZE,
        height: SIZE
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(BrandButton);
