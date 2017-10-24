// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { openToggle } from '../actions/navigationActions';
import Style from '../constants/Style';
import { emY } from '../utils/em';
// eslint-disable-next-line import/no-unresolved
import menuIcon from '../assets/icons/menu-2.png';

const SIZE = emY(1.25);

class MenuButton extends Component {
    render() {
        const { style, ...props } = this.props;
        return (
            <TouchableOpacity
                {...props}
                style={[Style.headerLeft, styles.container, style]}
                onPress={() => this.props.openToggle()}
            >
                <Image source={menuIcon} style={styles.image} resizeMode="contain" />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20
    },
    image: {
        width: SIZE,
        height: SIZE
    }
});

const mapDispatchToProps = dispatch => ({
    openToggle: () => dispatch(openToggle())
});

export default connect(null, mapDispatchToProps)(MenuButton);

