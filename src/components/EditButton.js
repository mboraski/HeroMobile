// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
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
                {...props}
                style={[styles.container, style]}
                onPress={this.toggleEditMode}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditButton);
