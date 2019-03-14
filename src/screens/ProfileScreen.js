// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Relative Imports
import BackButton from '../components/BackButton';
import TransparentButton from '../components/TransparentButton';
import InlineLabelTextInputField from '../components/InlineLabelTextInputField';
import Text from '../components/Text';
import AuthActions from '../actions/authActions';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

class ProfileScreen extends Component {
    state = {
        editMode: false
    };

    handleLogout = () => {
        this.props.actions.logout();
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.formSection}>INFORMATION</Text>
                <View style={styles.formInputs}>
                    <InlineLabelTextInputField name="name" label="Full Name" />
                    <InlineLabelTextInputField
                        name="number"
                        label="Phone Number"
                    />
                    <InlineLabelTextInputField
                        name="email"
                        label="Email"
                        keyboardType="email-address"
                    />
                </View>
                <Text style={styles.formSection}>ADDRESS</Text>
                <View style={styles.formInputs}>
                    <InlineLabelTextInputField name="country" label="Country" />
                    <InlineLabelTextInputField name="state" label="State" />
                    <InlineLabelTextInputField name="city" label="City" />
                    <InlineLabelTextInputField name="address" label="Address" />
                    <InlineLabelTextInputField name="zip" label="ZIP code" />
                </View>
                <TouchableOpacity onPress={this.handleLogout}>
                    <Text style={styles.logout}>LOGOUT?</Text>
                </TouchableOpacity>
                {this.state.editMode ? (
                    <Button
                        title="Save Changes"
                        onPress={this.onButtonPress}
                        containerViewStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                ) : null}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    formSection: {
        fontSize: emY(0.8125),
        color: Color.GREY_600,
        paddingHorizontal: 15,
        paddingTop: emY(2.1875),
        paddingBottom: emY(1)
    },
    formInputs: {},
    buttonContainer: {
        marginTop: emY(1)
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: emY(1)
    },
    buttonText: {
        fontSize: emY(0.8125)
    },
    logout: {
        textDecorationLine: 'underline',
        fontSize: emY(0.8125),
        color: Color.GREY_600,
        paddingHorizontal: 15,
        paddingTop: emY(2.1875),
        paddingBottom: emY(1)
    }
});

const formOptions = {
    form: 'Profile'
};

const mapDispatchToProps = dispatch => {
    const authActions = bindActionCreators(AuthActions, dispatch);

    return {
        actions: {
            logout: authActions.logout
        }
    };
};

ProfileScreen.navigationOptions = {
    title: 'Profile Details',
    headerLeft: <BackButton />,
    headerRight: <TransparentButton />,
    headerStyle: Style.header,
    headerTitleStyle: Style.headerTitle
};

export default connect(
    null,
    mapDispatchToProps
)(reduxForm(formOptions)(ProfileScreen));
