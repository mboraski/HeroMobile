// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

// Relative Imports
import Style from '../constants/Style';
import { emY } from '../utils/em';
// eslint-disable-next-line import/no-unresolved
import mapIcon from '../assets/icons/menu.png';

const SIZE = emY(1.5);

class MenuButton extends Component {
    render() {
        const { style, ...props } = this.props;
        return (
            <TouchableOpacity
                {...props}
                style={[Style.headerLeft, styles.container, style]}
                onPress={() => this.props.navigation.openDrawer()}
            >
                <Image source={mapIcon} style={styles.image} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    image: {
        width: SIZE,
        height: SIZE
    }
});

export default withNavigation(MenuButton);
