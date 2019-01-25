import { orderStatuses } from '../constants/Order';
import { rtdb, firebaseAuth } from '../../firebase';
import * as api from '../api/hasty';
import { dropdownAlert } from './uiActions';
import { CLEAR_CART } from './cartActions';

const ORDER_REF = 'activeProducts/US/TX/Austin/orders';

export const SET_CONTRACTORS = 'set_contractors';
export const CLEAR_ORDER = 'clear_order';
export const ORDER_CREATION_SUCCESS = 'order_creation_success';
export const LISTEN_ORDER_STATUS = 'listen_order_status';
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';
export const UPDATE_ORDER_FULFILLMENT = 'update_order_fulfillment';
export const UPDATE_ORDER_ERROR = 'update_order_error';
export const CALL_CONTRACTOR_REQUEST = 'call_contractor_request';
export const COMPLETE_ORDER_REQUEST = 'complete_order_request';
export const COMPLETE_ORDER_SUCCESS = 'complete_order_success';
export const COMPLETE_ORDER_ERROR = 'complete_order_error';
export const OPEN_CHAT_MODAL = 'open_chat_modal';
export const CLOSE_CHAT_MODAL = 'close_chat_modal';
export const OPEN_ORDER_FOUND = 'open_order_found';
export const SET_NEW_MESSAGE_VALUE = 'set_new_message_value';
export const SEND_CHAT_MESSAGE_REQUEST = 'send_chat_message_request';
export const SEND_CHAT_MESSAGE_SUCCESS = 'send_chat_message_success';
export const SEND_CHAT_MESSAGE_ERROR = 'send_chat_message_error';
export const SET_ORDER_ID = 'set_order_id';
export const SET_CHAT_ID = 'set_chat_id';

export const setContractors = contractors => ({
    type: SET_CONTRACTORS,
    payload: contractors
});

export const clearOrder = () => dispatch => dispatch({ type: CLEAR_ORDER });

export const completeOrder = async values => {
    const {
        dispatch,
        orderId,
        userRating,
        productRating,
        overallRating,
        message
    } = values;
    try {
        const result = await api.completeOrder({
            orderId,
            userRating,
            productRating,
            overallRating,
            message
        });
        dispatch({ type: CLEAR_CART });
        dispatch({ type: CLEAR_ORDER });
        return result;
    } catch (error) {
        return;
    }
};

export const listenToOrderStatus = orderId => dispatch => {
    dispatch({ type: LISTEN_ORDER_STATUS });

    return rtdb
        .ref(`${ORDER_REF}/${orderId}/fulfillment/status`)
        .on('value', snapshot => {
            const status = snapshot.val();
            // look at just what has changed
            switch (status) {
                case orderStatuses.open:
                    dispatch({
                        type: UPDATE_ORDER_STATUS,
                        payload: orderStatuses.open
                    });
                    break;
                case orderStatuses.cancelled:
                    dispatch({
                        type: UPDATE_ORDER_STATUS,
                        payload: orderStatuses.cancelled
                    });
                    break;
                case orderStatuses.inprogress:
                    dispatch({
                        type: UPDATE_ORDER_STATUS,
                        payload: orderStatuses.inprogress
                    });
                    break;
                case orderStatuses.satisfied:
                    dispatch({
                        type: UPDATE_ORDER_STATUS,
                        payload: orderStatuses.satisfied
                    });
                    break;
                case orderStatuses.completed:
                    dispatch({
                        type: UPDATE_ORDER_STATUS,
                        payload: orderStatuses.completed
                    });
                    break;
                default:
                    break;
            }
        });
};

export const unListenOrderStatus = orderId =>
    rtdb.ref(`${ORDER_REF}/${orderId}/fulfillment/status`).off();

export const listenToOrderFulfillment = orderId => dispatch => {
    return rtdb
        .ref(`${ORDER_REF}/${orderId}/fulfillment/actualFulfillment`)
        .on('value', snapshot => {
            const fulfillment = snapshot.val();
            if (fulfillment) {
                dispatch({
                    type: UPDATE_ORDER_FULFILLMENT,
                    payload: fulfillment
                });
            }
        });
};

export const unListenToOrderFulfillment = orderId =>
    rtdb.ref(`${ORDER_REF}/${orderId}/fulfillment/actualFulfillment`).off();

export const listenToOrderError = orderId => dispatch => {
    return rtdb
        .ref(`${ORDER_REF}/${orderId}/fulfillment/error`)
        .on('value', snapshot => {
            const error = snapshot.val();
            if (error) {
                dispatch({ type: UPDATE_ORDER_ERROR, payload: error });
            }
        });
};

export const unListenOrderError = orderId =>
    rtdb.ref(`${ORDER_REF}/${orderId}/fulfillment/error`).off();

export const contactContractor = (
    contractorId,
    phoneNumber
) => async dispatch => {
    dispatch({ type: CALL_CONTRACTOR_REQUEST }); // TODO: nothing listening yet
    try {
        await api.consumerCallsContractor({
            contractorId,
            phoneNumber
        });
        console.log('call to contractor success: ');
    } catch (err) {
        console.log('call to contractor errored: ');
    }
};

export const setOrderId = orderId => dispatch =>
    dispatch({ type: SET_ORDER_ID, payload: orderId });

export const setChatId = chatId => dispatch =>
    dispatch({ type: SET_CHAT_ID, payload: chatId });

export const openChatModal = contractorId => dispatch =>
    dispatch({ type: OPEN_CHAT_MODAL, payload: contractorId });

export const closeChatModal = () => dispatch =>
    dispatch({ type: CLOSE_CHAT_MODAL });

export const sendMessage = (content, orderId, chatId) => async dispatch => {
    console.log('new message to send: ', content);
    dispatch({ type: SEND_CHAT_MESSAGE_REQUEST });
    const timeStamp = Date.now();
    const message = {
        timeStamp,
        content,
        uid: firebaseAuth.currentUser.uid
    };
    try {
        await rtdb
            .ref(
                `${ORDER_REF}/${orderId}/fulfillment/actualFulfillment/full/${chatId}`
            )
            .child('chat')
            .update({ [timeStamp]: message });
        dispatch({ type: SEND_CHAT_MESSAGE_SUCCESS });
    } catch (error) {
        console.log('sendMessage error: ', error);
        dispatch(dropdownAlert(true, 'Error sending message.'));
        dispatch({ type: SEND_CHAT_MESSAGE_ERROR });
    }
};

export const setNewMessageValue = message => dispatch => {
    dispatch({ type: SET_NEW_MESSAGE_VALUE, payload: message });
};
