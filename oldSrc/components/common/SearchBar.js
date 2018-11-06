import React, { Component } from 'react';
import { TextInput } from 'react-native';

class SearchBar extends Component {
    render() {
        return (
            <TextInput
                style={{ height: 40 }}
                onChangeText={text => {
                    console.log(text);
                }}
                value={'Search Bah'}
            />
        );
    }
}

export default SearchBar;
