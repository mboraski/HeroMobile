// Third Party Imports
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    // Image,
    Platform
} from 'react-native';

// Relative Imports
import Color from '../constants/Color';
// import Style from '../constants/Style';
import { emY } from '../utils/em';
// import logoBlack from '../assets/icons/logo-black.png';

const SIZE = emY(5.62);
type Props = {
    openModal: boolean,
    closeModal: () => {},
    message: string
};

class EntryMessage extends Component {
    state = {
        modalVisible: false,
    }

    componentDidMount() {
        const { openModal } = this.props;
        this.setState({
            modalVisible: openModal,
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

    props: Props;

    render() {
        const { message } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.outerContainer}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.label}>{message}</Text>
                    </View>
                    {/* <Image source={logoBlack} style={styles.checkIcon} resizeMode="contain" /> */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.CLEAR,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    outerContainer: {
        paddingTop: SIZE / 2,
        backgroundColor: Color.CLEAR,
        marginHorizontal: 22,
        alignSelf: 'stretch',
    },
    innerContainer: {
        backgroundColor: Color.WHITE,
        paddingTop: emY(3),
        paddingBottom: emY(2),
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
        marginHorizontal: 40,
        lineHeight: emY(1.5),
    },
    checkIcon: {
        position: 'absolute',
        top: 0,
        width: SIZE,
        height: SIZE,
        alignSelf: 'center'
    }
});

export default EntryMessage;
