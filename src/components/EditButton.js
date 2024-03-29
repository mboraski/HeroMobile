// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import Text from './Text';
import { emY } from '../utils/em';

const SIZE = emY(1.25);

class EditButton extends Component {
    toggleEditMode = () => {
        // TODO: flip edit mode
    };

    render() {
        const { style, ...props } = this.props;
        return (
            <TouchableOpacity
                style={[styles.container, style]}
                onPress={this.toggleEditMode}
                {...props}
            >
                <Text />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20
    },
    text: {
        width: SIZE,
        height: SIZE
    }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditButton);
