// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { openToggle } from '../actions/navigationActions';
import { emY } from '../utils/em';
import mapIcon from '../assets/icons/menu-2.png';

const SIZE = emY(1.4375);

class MenuButton2 extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.openToggle()}
                style={styles.container}
            >
                <Image
                    source={mapIcon}
                    style={styles.image}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    image: {
        width: SIZE,
        height: SIZE
    }
});

const mapDispatchToProps = dispatch => ({
    openToggle: () => dispatch(openToggle())
});

export default connect(
    null,
    mapDispatchToProps
)(MenuButton2);
