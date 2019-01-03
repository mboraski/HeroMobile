// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

// Relative Imports
import CloseButton from '../components/CloseButton';
import NotificationFeedbackFormContainer from '../containers/NotificationFeedbackFormContainer';
import Style from '../constants/Style';
import { emY } from '../utils/em';

const keyboardVerticalOffset = emY(1);

class NotificationFeedbackScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const handlePressClose = () => navigation.goBack();
        return {
            title:
                (navigation.state.params && navigation.state.params.title) ||
                'Feedback',
            headerLeft: <CloseButton onPress={handlePressClose} />,
            headerStyle: Style.header,
            headerTitleStyle: Style.headerTitle
        };
    };

    render() {
        const description =
            this.props.navigation.state.params &&
            this.props.navigation.state.params.description;
        const formKey =
            this.props.navigation.state.params &&
            this.props.navigation.state.params.key;
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <NotificationFeedbackFormContainer
                    navigation={this.props.navigation}
                    formKey={formKey}
                    description={description}
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

export default NotificationFeedbackScreen;
