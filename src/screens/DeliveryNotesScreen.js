// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

// Relative Imports
import CloseButton from '../components/CloseButton';
import TransparentButton from '../components/TransparentButton';
import DeliveryNotesFormContainer from '../containers/DeliveryNotesFormContainer';
import Style from '../constants/Style';
import { emY } from '../utils/em';

const keyboardVerticalOffset = emY(1);

class DeliveryNotesScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const handlePressClose = () => navigation.pop();
        return {
            title: 'Delivery Notes',
            headerLeft: <CloseButton onPress={handlePressClose} />,
            headerRight: <TransparentButton />,
            headerStyle: Style.header,
            headerTitleStyle: Style.headerTitle
        };
    };

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <DeliveryNotesFormContainer
                    navigation={this.props.navigation}
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default DeliveryNotesScreen;
