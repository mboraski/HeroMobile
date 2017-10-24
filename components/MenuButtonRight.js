// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { emY } from '../utils/em';
import mapIcon from '../assets/icons/menu-2.png';
import { openToggle } from '../actions/navigationActions';

const SIZE = emY(1.25);

class MenuButton2 extends Component {
    render() {
        const { isOpened, toggleMenu } = this.props;
        
        return (
            <TouchableOpacity 
                style={styles.container} 
                onPress={() => toggleMenu(!isOpened)} 
            >
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

const mapStateToProps = state => ({ isOpened: state.isOpened });


const mapDispatchToProps = dispatch => ({
    openToggle: () => dispatch(openToggle())
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton2);
