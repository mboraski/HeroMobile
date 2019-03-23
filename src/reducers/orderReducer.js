import {
    SET_CONTRACTORS,
    CLEAR_ORDER,
    ORDER_CREATION_SUCCESS,
    LISTEN_ORDER_STATUS,
    UPDATE_ORDER_STATUS,
    UPDATE_ORDER_FULFILLMENT,
    UPDATE_ORDER_ERROR,
    OPEN_CHAT_MODAL,
    CLOSE_CHAT_MODAL,
    OPEN_ORDER_FOUND,
    SET_ORDER_ID,
    SET_CHAT_ID,
    SET_NEW_MESSAGE_VALUE,
    SEND_CHAT_MESSAGE_REQUEST,
    SEND_CHAT_MESSAGE_SUCCESS,
    SEND_CHAT_MESSAGE_ERROR,
    INCREASE_CHAT_NOTIFICATION_COUNT,
    CLEAR_CHAT_NOTIFICATION_COUNT
} from '../actions/orderActions';
import { SIGNOUT_SUCCESS } from '../actions/authActions';

import { orderStatuses } from '../constants/Order';

const initialState = {
    orderId: '',
    contactorIds: {},
    pending: false,
    status: '',
    order: {},
    error: null,
    chatModalVisible: false,
    chatId: '',
    newMessageValue: '',
    chatPending: false,
    notificationCount: 0
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNOUT_SUCCESS:
            return initialState;
        case SET_CONTRACTORS:
            return {
                ...state,
                contactorIds: action.payload
            };
        case CLEAR_ORDER:
            return {
                ...state,
                ...initialState
            };
        case ORDER_CREATION_SUCCESS: // Old?
            return {
                ...state,
                orderId: action.payload
            };
        case OPEN_ORDER_FOUND:
            return {
                ...state,
                orderId: action.payload
            };
        case SET_ORDER_ID:
            return {
                ...state,
                orderId: action.payload
            };
        case SET_CHAT_ID:
            return {
                ...state,
                chatId: action.payload
            };
        case LISTEN_ORDER_STATUS:
            return {
                ...state,
                pending: true
            };
        case UPDATE_ORDER_STATUS:
            return {
                ...state,
                status: action.payload,
                pending: action.payload !== orderStatuses.completed
            };
        case UPDATE_ORDER_FULFILLMENT:
            return {
                ...state,
                order: action.payload
            };
        case UPDATE_ORDER_ERROR:
            return {
                ...state,
                error: action.payload,
                pending: false
            };
        case OPEN_CHAT_MODAL:
            return {
                ...state,
                chatId: action.payload,
                chatModalVisible: true
            };
        case CLOSE_CHAT_MODAL:
            return {
                ...state,
                chatId: '',
                chatModalVisible: false
            };
        case SET_NEW_MESSAGE_VALUE:
            return {
                ...state,
                newMessageValue: action.payload
            };
        case SEND_CHAT_MESSAGE_REQUEST:
            return {
                ...state,
                chatPending: true
            };
        case SEND_CHAT_MESSAGE_SUCCESS:
            return {
                ...state,
                newMessageValue: '',
                chatPending: false
            };
        case SEND_CHAT_MESSAGE_ERROR:
            return {
                ...state,
                chatPending: false
            };
        case INCREASE_CHAT_NOTIFICATION_COUNT:
            return {
                ...state,
                notificationCount: state.notificationCount + 1
            };
        case CLEAR_CHAT_NOTIFICATION_COUNT:
            return {
                ...state,
                notificationCount: 0
            };
        default:
            return state;
    }
};

export default orderReducer;
