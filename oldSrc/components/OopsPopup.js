// Third Party Imports
import React, { Component } from 'react';
import {
    StyleSheet,
    Modal,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';
import closeIcon from '../assets/icons/close-circle.png';

const SIZE = emY(3.44);

type Props = {
    openModal: boolean,
    closeModal: () => {},
    message: string,
    showIcon: boolean
};

class OopsPopup extends Component {
    static defaultProps = {
        showIcon: true
    };

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

    closeModal(isApply) {
        this.props.closeModal(isApply);
    }

    props: Props;

    render() {
        const { message, showIcon } = this.props;
        const { modalVisible } = this.state;
        return (
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {}}
                style={styles.modalContainer}
                transparent
            >
                <View style={styles.container}>
                    <TouchableOpacity
                        style={Style.backdropContainer}
                        onPress={() => this.closeModal()}
                        activeOpacity={1}
                    >
                        <Text style={Style.clearText}>.</Text>
                    </TouchableOpacity>
                    <View style={styles.innerContainer}>
                        <Text style={styles.label}>Oops</Text>
                        {showIcon ? (
                            <Image
                                source={closeIcon}
                                style={styles.checkIcon}
                                resizeMode="contain"
                            />
                        ) : null}
                        <Text style={styles.message}>{message}</Text>
                        <TouchableOpacity
                            onPress={() => this.closeModal(true)}
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
                                OK
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.closeModal(true)}
                            style={[
                                styles.button,
                                { backgroundColor: Color.WHITE }
                            ]}
                        >
                            <Text
                                style={[
                                    styles.buttonLabel,
                                    { color: Color.BLACK }
                                ]}
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>
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
    label: {
        textAlign: 'center',
        fontSize: emY(1.08),
        marginVertical: emY(1.58)
    },
    message: {
        textAlign: 'center',
        fontSize: emY(1.08),
        marginBottom: emY(1.58)
    },
    checkIcon: {
        width: SIZE,
        height: SIZE,
        alignSelf: 'center',
        marginBottom: emY(1.58)
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

const mapDispatchToProps = function(dispatch) {
    return {};
};

export default connect(
    null,
    mapDispatchToProps
)(OopsPopup);
