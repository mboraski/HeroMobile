// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import MenuButton from '../components/MenuButton';
import Style from '../constants/Style';

class HistoryScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>HistoryScreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

HistoryScreen.navigationOptions = {
    headerLeft: <MenuButton />,
    headerRight: <MenuButton />
};

export default connect(
    () => ({}),
    null
)(HistoryScreen);
