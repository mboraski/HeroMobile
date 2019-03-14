// Third Party Imports
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import CloseButton from '../components/CloseButton';
import FeedbackFormContainer from '../containers/FeedbackFormContainer';
import TransparentButton from '../components/TransparentButton';

import { dropdownAlert } from '../actions/uiActions';
import { sendOpenFeedback } from '../actions/feedbackActions';

import { getPending } from '../selectors/feedbackSelectors';

import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

const keyboardVerticalOffset = emY(1);

class OpenFeedbackScreen extends Component {
    onSubmit = (result, dispatch) => {
        let message = '';
        const timestamp = Date.now();
        if (result) {
            // send name and message also
            message = result.message;
        }
        this.props.sendOpenFeedback(message, timestamp);
        dispatch(dropdownAlert(true, 'Thanks for the feedback!'));
        this.props.navigation.navigate('map');
    };

    render() {
        const pending = this.props.pending;
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                {pending ? (
                    <View style={styles.overlay}>
                        <ActivityIndicator
                            animating={pending}
                            size="large"
                            color={Color.DEFAULT}
                        />
                    </View>
                ) : (
                    <FeedbackFormContainer onSubmitSuccess={this.onSubmit} />
                )}
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.WHITE
    },
    overlay: {
        position: 'absolute',
        zIndex: 100,
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        justifyContent: 'center',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    },
    title: {
        marginBottom: emY(1),
        fontSize: emY(1)
    },
    ratings: {
        alignItems: 'center',
        flex: 1,
        paddingTop: emY(2)
    },
    rating: {
        marginBottom: emY(4)
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: emY(1),
        marginBottom: emY(1)
    },
    buttonText: {
        fontSize: emY(1)
    }
});

OpenFeedbackScreen.navigationOptions = ({ navigation }) => {
    const handlePressClose = () => navigation.pop();
    return {
        title: 'Feedback',
        headerStyle: Style.header,
        headerTitleStyle: Style.headerTitle,
        headerLeft: <CloseButton onPress={handlePressClose} />,
        headerRight: <TransparentButton />
    };
};

const mapStateToProps = state => ({
    pending: getPending(state)
});

const mapDispatchToProps = {
    sendOpenFeedback
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OpenFeedbackScreen);
