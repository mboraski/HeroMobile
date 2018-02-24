import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text, Button } from 'react-native-elements';
import axios from 'axios';

import Color from '../constants/Color';

const ROOT_URL = 'https://us-central1-hasty-14d18.cloudfunctions.net';

class SignUpForm extends Component {
    state = { phone: '' };

    handleName = name => {
        this.setState({ name });
    };

    handleEmail = email => {
        this.setState({ email });
    };

    handlePhoneNumber = phoneNumber => {
        this.setState({ phoneNumber });
    };

    handlePassword = password => {
        this.setState({ password });
    };

    handleConfirmPassword = confirmPassword => {
        this.setState({ confirmPassword });
    };

    handleSubmit = async () => {
        try {
            await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone });
            await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone });
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formInputs}>
                    <View style={styles.formInputGroup}>
                        <Text style={styles.label}>Name</Text>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                value={this.state.name}
                                onChangeText={this.handleName}
                                style={styles.textInput}
                            />
                        </View>
                    </View>
                    <View style={styles.formInputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                value={this.state.email}
                                onChangeText={this.handleEmail}
                                style={styles.textInput}
                                keyboardType="email-address"
                            />
                        </View>
                    </View>
                    <View style={styles.formInputGroup}>
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                value={this.state.phoneNumber}
                                onChangeText={this.handlePhoneNumber}
                                style={styles.textInput}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>
                    <View style={styles.formInputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            value={this.state.password}
                            onChangeText={this.handlePassword}
                            style={styles.textInput}
                            secureTextEntry
                        />
                    </View>
                    <View style={[styles.formInputGroup, styles.formInputGroupMargin]}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            value={this.state.confirmPassword}
                            onChangeText={this.handleConfirmPassword}
                            style={styles.textInput}
                            secureTextEntry
                        />
                    </View>
                </View>
                <Button
                    onPress={this.handleSubmit}
                    title="Create Account"
                    buttonStyle={styles.button}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 15
    },
    formInputs: {
        flex: 1,
        paddingHorizontal: 15
    },
    formInputGroup: {
        flexDirection: 'row',
        borderColor: Color.GREY_500,
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignItems: 'center'
    },
    formInputGroupMargin: {
        marginBottom: 20
    },
    label: {
        color: '#000',
        fontWeight: 'normal',
        paddingVertical: 10,
        marginRight: 15
    },
    textInputContainer: {
        flex: 1
    },
    textInput: {
        flex: 1,
        textAlign: 'right'
    },
    button: {
        backgroundColor: '#000'
    }
});

export default SignUpForm;
