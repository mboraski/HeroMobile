import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import debounce from 'lodash/debounce';

import { emY } from '../utils/em';

class DebounceTextInput extends Component {
    static defaultProps = {
        onChangeText: () => {}
    };

    onDebounce = text => {
        this.props.onDebounce(text);
    };

    onDebounce = debounce(this.onDebounce, 500);

    handleText = text => {
        this.props.onChangeText(text);
        this.onDebounce(text);
    };

    render() {
        const { style, ...props } = this.props;
        return (
            <TextInput
                ref={c => (this.component = c)}
                {...props}
                style={[styles.container, style]}
                underlineColorAndroid="transparent"
                onChangeText={this.handleText}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: emY(0.625),
        flex: 1
    }
});

export default DebounceTextInput;
