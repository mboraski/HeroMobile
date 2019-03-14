// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';

// Relative Imports
import Text from './Text';
import Color from '../constants/Color';
import Popup, { styles as PopupStyles } from '../components/Popup';
import { emY } from '../utils/em';
import checkIcon from '../assets/icons/check.png';
import logoIcon from '../assets/icons/logo-orange.png';

const SIZE = emY(3.44);
type Props = {
    openModal: boolean,
    closeModal: () => {},
    showIcon: boolean,
    message: string,
    title: string
};

class SuccessPopup extends Component {
    static defaultProps = {
        showIcon: true,
        confirmText: 'Apply',
        cancelText: 'Cancel'
    };

    closeModal(apply) {
        this.props.closeModal(apply);
    }

    props: Props;

    render() {
        const {
            title,
            message,
            showIcon,
            confirmText,
            cancelText,
            logo,
            ...rest
        } = this.props;
        const icon = logo ? logoIcon : checkIcon;
        return (
            <Popup {...rest} closeModal={() => this.closeModal(false)}>
                <Text style={PopupStyles.label}>{title}</Text>
                {showIcon ? (
                    <Image
                        source={icon}
                        style={styles.checkIcon}
                        resizeMode="contain"
                    />
                ) : null}
                <Text style={PopupStyles.label}>{message}</Text>
                <TouchableOpacity
                    onPress={() => this.closeModal(true)}
                    style={[styles.button, { backgroundColor: Color.BLACK }]}
                >
                    <Text style={[styles.buttonLabel, { color: Color.WHITE }]}>
                        {confirmText}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.closeModal(false)}
                    style={[styles.button, { backgroundColor: Color.CLEAR }]}
                >
                    <Text style={[styles.buttonLabel, { color: Color.BLACK }]}>
                        {cancelText}
                    </Text>
                </TouchableOpacity>
            </Popup>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.CLEAR,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerContainer: {
        backgroundColor: Color.WHITE,
        paddingVertical: emY(1.13),
        paddingHorizontal: 17,
        marginHorizontal: 22,
        borderRadius: 4,
        justifyContent: 'center',
        alignSelf: 'stretch',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: emY(0.625) },
                shadowOpacity: 0.5,
                shadowRadius: emY(1.5)
            },
            android: {
                elevation: 10
            }
        })
    },
    checkIcon: {
        width: SIZE,
        height: SIZE,
        alignSelf: 'center',
        marginVertical: emY(1)
    },
    button: {
        height: emY(2.5),
        marginHorizontal: 33,
        marginVertical: emY(0.75),
        borderRadius: emY(1.25),
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLabel: {
        fontSize: emY(0.96)
    }
});

export default SuccessPopup;
