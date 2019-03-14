// Third Party Imports
import React, { Component, createRef } from 'react';
import { Constants } from 'expo';
import {
    ScrollView,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Image,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import map from 'lodash.map';
import { Button } from 'react-native-elements';

// Relative Imports
import { firebaseAuth } from '../../firebase';

import Color from '../constants/Color';
import Text from '../components/Text';
import CloseButton from '../components/CloseButton';
import Dimensions from '../constants/Dimensions';
import logo from '../assets/icons/HastyOrangeIcon.png';

import { emY } from '../utils/em';

import {
    getMessageList,
    getNewMessageValue,
    getOrderId,
    getChatId,
    getChatPending
} from '../selectors/orderSelectors';
import {
    closeChatModal,
    sendMessage,
    setNewMessageValue,
    clearChatNotificationCount
} from '../actions/orderActions';

const WINDOW_WIDTH = Dimensions.window.width;
const PROFILE_IMAGE_SIZE = emY(2);

class ChatModalContainer extends Component {
    scroll = createRef();

    componentDidMount() {
        setTimeout(() => {
            this.scroll.current.scrollToEnd();
        }, 50);
    }

    componentDidUpdate(prevProps) {
        // scroll to bottom when a new message is added
        if (
            Object.keys(prevProps.messageList).length !==
            Object.keys(this.props.messageList).length
        ) {
            setTimeout(() => {
                this.scroll.current.scrollToEnd();
            }, 50);
        }
    }

    setNewMessageValue = newValue => {
        this.props.setNewMessageValue(newValue);
    };

    closeModal = () => {
        this.props.closeChatModal();
        this.props.clearChatNotificationCount();
    };

    sendMessage = () => {
        this.props.sendMessage(
            this.props.newMessageValue,
            this.props.orderId,
            this.props.chatId
        );
    };

    renderMessageList = () => {
        const { messageList } = this.props;
        const profileImage = this.props.profileImage || logo;
        const timeStamps = Object.keys(messageList);
        timeStamps.sort();
        if (messageList) {
            return map(timeStamps, (timeStamp, i) => {
                const message = messageList[timeStamp];
                if (message.uid === firebaseAuth.currentUser.uid) {
                    return (
                        <View key={i} style={styles.messageRowConsumer}>
                            <View style={[styles.message, styles.userMessage]}>
                                <Text style={styles.userMessageText}>
                                    {message.content}
                                </Text>
                            </View>
                        </View>
                    );
                } else {
                    return (
                        <View key={i} style={styles.messageRowContractor}>
                            <Image
                                style={styles.profileImage}
                                source={profileImage}
                            />
                            <View style={[styles.message, styles.heroMessage]}>
                                <Text style={styles.heroMessageText}>
                                    {message.content}
                                </Text>
                            </View>
                        </View>
                    );
                }
            });
        } else {
            return <Text style={styles.heroMessageText}>No messages...</Text>;
        }
    };

    render() {
        const { newMessageValue, chatPending } = this.props;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <CloseButton
                    onPress={this.closeModal}
                    style={styles.closeModalButton}
                />
                <ScrollView
                    ref={this.scroll}
                    contentContainerStyle={styles.scrollableContent}
                    keyboardDismissMode="none"
                >
                    {this.renderMessageList()}
                </ScrollView>
                <TextInput
                    placeholder={'Type a comment'}
                    placeholderTextColor={Color.GREY_600}
                    maxLength={1000}
                    spellCheck
                    style={styles.textInput}
                    onChangeText={this.setNewMessageValue}
                    value={newMessageValue}
                />
                {chatPending ? (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator
                            animating={chatPending}
                            size="small"
                            color="#f5a623"
                        />
                    </View>
                ) : (
                    <Button
                        title="Submit"
                        buttonStyle={[styles.buttonSend]}
                        textStyle={[styles.buttonSendText]}
                        onPress={this.sendMessage}
                        disabled={!newMessageValue.length}
                    />
                )}
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.WHITE,
        marginTop: Constants.statusBarHeight
    },
    scrollableContent: {
        padding: 10
    },
    messageRowContractor: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    messageRowConsumer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    message: {
        maxWidth: WINDOW_WIDTH - PROFILE_IMAGE_SIZE * 3.5,
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 8,
        marginVertical: 10
    },
    userMessage: {
        backgroundColor: Color.ORANGE_500
    },
    heroMessage: {
        backgroundColor: Color.GREY_200
    },
    heroMessageText: {
        color: Color.BLACK,
        fontSize: emY(1.1)
    },
    userMessageText: {
        color: Color.WHITE,
        fontSize: emY(1.1)
    },
    closeModalButton: {
        margin: 10,
        marginLeft: 10
    },
    profileImage: {
        marginRight: emY(0.7),
        width: PROFILE_IMAGE_SIZE,
        height: PROFILE_IMAGE_SIZE,
        borderRadius: PROFILE_IMAGE_SIZE / 2
    },
    textInput: {
        backgroundColor: Color.GREY_200,
        borderRadius: 10,
        margin: 15,
        height: emY(2.4),
        paddingVertical: emY(0.1),
        paddingHorizontal: emY(0.5)
    },
    activityIndicator: {
        height: emY(2.4),
        padding: 0,
        marginBottom: 20
    },
    buttonSend: {
        borderRadius: 5,
        backgroundColor: Color.DEFAULT,
        height: emY(2.4),
        padding: 0,
        marginBottom: 20
    },
    buttonSendText: {
        color: Color.WHITE,
        fontSize: emY(1)
    }
});

const mapStateToProps = state => ({
    messageList: getMessageList(state),
    newMessageValue: getNewMessageValue(state),
    orderId: getOrderId(state),
    chatId: getChatId(state),
    chatPending: getChatPending(state)
});

const mapDispatchToProps = {
    closeChatModal,
    sendMessage,
    setNewMessageValue,
    clearChatNotificationCount
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatModalContainer);
