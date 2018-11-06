// Third Party Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Modal,
    View,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';

// Relative Imports
import Text from './Text';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';
import checkIcon from '../assets/icons/check-wrap.png';

const SIZE = emY(5.62);

class ContinuePopup extends Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
        message: PropTypes.string.isRequired
    };

    render() {
        const { message, isOpen, closeModal } = this.props;
        return (
            <Modal
                animationType="slide"
                visible={isOpen}
                onRequestClose={() => {}}
                style={styles.modalContainer}
                transparent
            >
                <View style={styles.container}>
                    <TouchableOpacity
                        style={Style.backdropContainer}
                        onPress={closeModal}
                        activeOpacity={1}
                    >
                        <Text style={Style.clearText}>.</Text>
                    </TouchableOpacity>
                    <View style={styles.outerContainer}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.label}>{message}</Text>
                            <TouchableOpacity
                                onPress={closeModal}
                                style={[
                                    styles.button,
                                    { backgroundColor: Color.BLACK }
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.buttonLabel,
                                        { color: Color.WHITE }
                                    ]}
                                >
                                    CONTINUE
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Image
                            source={checkIcon}
                            style={styles.checkIcon}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </Modal>
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
    outerContainer: {
        paddingTop: SIZE / 2.0,
        backgroundColor: Color.CLEAR,
        marginHorizontal: 22,
        alignSelf: 'stretch'
    },
    innerContainer: {
        backgroundColor: Color.WHITE,
        paddingTop: emY(5),
        borderRadius: 4,
        justifyContent: 'center',
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
    label: {
        textAlign: 'center',
        fontSize: emY(1.08),
        marginHorizontal: 70,
        lineHeight: emY(1.5)
    },
    checkIcon: {
        position: 'absolute',
        top: 0,
        width: SIZE,
        height: SIZE,
        alignSelf: 'center'
    },
    button: {
        height: emY(2.88),
        marginTop: emY(2.3),
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLabel: {
        fontSize: emY(0.96)
    }
});

export default ContinuePopup;
