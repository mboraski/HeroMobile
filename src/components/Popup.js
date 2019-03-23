// Third Party Imports
import React, { Component } from 'react';
import {
    StyleSheet,
    Modal,
    View,
    TouchableOpacity,
    Platform
} from 'react-native';

// Relative Imports
import Color from '../constants/Color';
import { emY } from '../utils/em';

type Props = {
    openModal: boolean,
    closeModal: () => {}
};

class Popup extends Component {
    props: Props;

    render() {
        const { openModal, closeModal, children } = this.props;
        return (
            <Modal
                animationType="fade"
                visible={openModal}
                onRequestClose={() => {}}
                style={StyleSheet.absoluteFill}
                transparent
            >
                <View style={[StyleSheet.absoluteFill, styles.container]}>
                    <TouchableOpacity
                        style={StyleSheet.absoluteFill}
                        onPress={closeModal}
                        activeOpacity={1}
                    />
                    <View style={styles.innerContainer}>{children}</View>
                </View>
            </Modal>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerContainer: {
        backgroundColor: Color.WHITE,
        paddingVertical: emY(1.5),
        paddingHorizontal: 17,
        marginHorizontal: 22,
        borderRadius: 6,
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
    label: {
        textAlign: 'center',
        fontSize: emY(1.08),
        marginVertical: emY(1),
        lineHeight: emY(1.5),
        marginHorizontal: 30
    }
});

export default Popup;
