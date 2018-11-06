// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

// Relative Imports
import FeedbackFormCloseButtonContainer from '../containers/FeedbackFormCloseButtonContainer';
import FeedbackFormContainer from '../containers/FeedbackFormContainer';

import Rating from '../components/Rating';
import Text from '../components/Text';

import {
    showFeedbackForm,
    hideFeedbackForm,
    dropdownAlert
} from '../actions/uiActions';
import { completeOrder } from '../actions/orderActions';

import { getFeedbackFormVisible } from '../selectors/uiSelectors';
import { getContractorName, getOrderId } from '../selectors/orderSelectors';

import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

const keyboardVerticalOffset = emY(1);

class FeedbackScreen extends Component {
    state = {
        userRating: 0,
        productRating: 0,
        overallRating: 0
    };

    componentWillUnmount() {
        this.props.hideFeedbackForm();
    }

    handleUserRating = userRating => {
        this.setState({ userRating });
    };

    handleProductRating = productRating => {
        this.setState({ productRating });
    };

    handleOverallRating = overallRating => {
        this.setState({ overallRating });
    };

    onButtonPress = () => {
        if (!this.props.feedbackFormVisible) {
            this.props.showFeedbackForm();
        }
    };

    onSubmit = (result, dispatch) => {
        let message = '';
        if (result) {
            // send name and message also
            message = result.message;
        }
        const userRating = this.state.userRating;
        const productRating = this.state.productRating;
        const overallRating = this.state.overallRating;
        dispatch(dropdownAlert(true, 'Thanks! See you again soon!'));
        completeOrder({
            dispatch,
            orderId: this.props.orderId,
            userRating,
            productRating,
            overallRating,
            message
        });
        this.props.navigation.navigate('map');
    };

    render() {
        const { name, feedbackFormVisible } = this.props;
        const { userRating, productRating, overallRating } = this.state;
        const productTitle = 'How was the product condition?';
        return feedbackFormVisible ? (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <FeedbackFormContainer onSubmitSuccess={this.onSubmit} />
            </KeyboardAvoidingView>
        ) : (
            <View style={styles.container}>
                <View style={styles.ratings}>
                    <Text style={styles.title}>How was {name}?</Text>
                    <Rating
                        style={styles.rating}
                        value={userRating}
                        onChange={this.handleUserRating}
                    />
                    <Text style={styles.title}>{productTitle}</Text>
                    <Rating
                        style={styles.rating}
                        value={productRating}
                        onChange={this.handleProductRating}
                    />
                    <Text style={styles.title}>
                        How was your experience overall?
                    </Text>
                    <Rating
                        style={styles.rating}
                        value={overallRating}
                        onChange={this.handleOverallRating}
                    />
                </View>
                <Button
                    title="CONTINUE"
                    onPress={this.onButtonPress}
                    containerViewStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.WHITE
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

FeedbackScreen.navigationOptions = () => {
    return {
        title: 'Feedback',
        headerStyle: Style.header,
        headerTitleStyle: Style.headerTitle,
        headerLeft: <FeedbackFormCloseButtonContainer />
    };
};

const mapStateToProps = state => ({
    name: getContractorName(state),
    feedbackFormVisible: getFeedbackFormVisible(state),
    orderId: getOrderId(state)
});

const mapDispatchToProps = {
    showFeedbackForm,
    hideFeedbackForm,
    completeOrder
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedbackScreen);
