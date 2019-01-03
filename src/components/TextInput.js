import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default class AppTextInput extends Component {
    render() {
        return (
            <TextInput
                {...this.props}
                ref={c => (this.component = c)}
                style={[styles.textInput, this.props.style]}
            />
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        fontFamily: 'Arial'
    }
});
