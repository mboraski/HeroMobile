// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Modal, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import Color from '../constants/Color';
import { emY } from '../utils/em';
import callIcon from '../assets/icons/call.png';
import messageIcon from '../assets/icons/multi_message.png';
import emailIcon from '../assets/icons/mail_close.png';

const SIZE = emY(5.62);
const buttonData = [
    {
        index: 0,
        icon: callIcon,
        title: 'CALL'
    },
    {
        index: 1,
        icon: messageIcon,
        title: 'LIVE CHAT'
    },
    {
        index: 2,
        icon: emailIcon,
        title: 'EMAIL'
    }
];
type Props = {
    openModal: boolean,
    closeModal: () => {}
};

class CustomerServicePopup extends Component {
    state = {
        modalVisible: false
    };

    componentDidMount() {
        const { openModal } = this.props;
        this.setState({
            modalVisible: openModal
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.openModal !== this.props.openModal) {
            this.setState({
                modalVisible: nextProps.openModal
            });
        }
    }

    closeModal(apply) {
        this.props.closeModal(apply);
    }

    buttonClickHandler(index) {
        switch (index) {
            case 0:
                //Navigate to phone call page.
                break;
            case 1:
                //Navigate to chat page
                break;
            case 2:
                //Navigate to Email page
                break;
            default:
        }
        this.props.closeModal(index);
    }
    props: Props;

    render() {
        const { modalVisible } = this.state;
        const buttonGroup = buttonData.map(item => (
            <View key={item.index}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.buttonClickHandler(item.index)}
                >
                    <Image source={item.icon} style={styles.icon} resizeMode="contain" />
                </TouchableOpacity>
                <Text style={styles.buttonLabel}>{item.title}</Text>
            </View>
        ));
        return (
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {}}
                style={StyleSheet.absoluteFill}
                transparent
            >
                <View style={[StyleSheet.absoluteFill, styles.container]}>
                    <TouchableOpacity
                        style={StyleSheet.absoluteFill}
                        onPress={() => this.closeModal()}
                        activeOpacity={1}
                    />
                    <View style={styles.innerContainer}>
                        <Text style={styles.label}>
                            Select the way you want to connect with customer service
                        </Text>
                        <View style={styles.buttonGroupContainer}>{buttonGroup}</View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
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
    },
    buttonGroupContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: emY(1)
    },
    icon: {
        height: SIZE / 3.0,
        width: SIZE / 3.0,
        alignSelf: 'center'
    },
    button: {
        height: SIZE,
        width: SIZE,
        borderRadius: SIZE / 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.BLACK
    },
    buttonLabel: {
        fontSize: emY(0.83),
        alignSelf: 'center',
        marginTop: emY(1)
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(CustomerServicePopup);
