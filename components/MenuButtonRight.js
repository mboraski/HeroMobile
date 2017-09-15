// Third Party Imports
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

// Relative Imports
import { emY } from '../utils/em';
import mapIcon from '../assets/icons/menu-2.png';
import toggleMenu from '../actions/menuActions'

const SIZE = emY(1.25);

class MenuButton2 extends Component {

    
    render() {
        console.log('isOpened: ', this.props.isOpened);
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.toggleMenu(!this.props.isOpened)}>
                <Image source={mapIcon} style={styles.image} resizeMode="contain" />
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

const mapStateToProps = state => {
    return ({
    isOpened: state.isOpened
})
}

function mapDispatchToProps (dispatch) {
    return {
        toggleMenu: bindActionCreators(toggleMenu, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton2);
