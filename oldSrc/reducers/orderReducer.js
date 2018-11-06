// import _ from 'lodash';

import {
    FISH_ORDERS_REQUEST,
    FISH_ORDERS_SUCCESS,
    FISH_ORDERS_FAILURE,
    ACCEPT_ORDER_REQUEST,
    ACCEPT_ORDER_SUCCESS,
    ACCEPT_ORDER_FAILURE,
    ARRIVE_ORDER_REQUEST,
    ARRIVE_ORDER_SUCCESS,
    ARRIVE_ORDER_FAILURE,
    COMPLETE_ORDER_REQUEST,
    COMPLETE_ORDER_SUCCESS,
    COMPLETE_ORDER_FAILURE
} from '../actions/orderActions';
import orderStatuses from '../constants/Order';

const initialState = {
    pending: false,
    potentialOrders: {},
    currentOrder: {},
    status: orderStatuses.unaccepted
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FISH_ORDERS_REQUEST:
            return {
                ...state,
                pending: true
            };
        case FISH_ORDERS_SUCCESS:
            return {
                ...state,
                potentialOrders: action.payload,
                pending: false
            };
        case FISH_ORDERS_FAILURE:
            return {
                ...state,
                error: action.payload,
                pending: false
            };
        case ACCEPT_ORDER_REQUEST:
            return {
                ...state,
                pending: true
            };
        case ACCEPT_ORDER_SUCCESS:
            return {
                ...state,
                currentOrder: action.payload,
                status: orderStatuses.accepted,
                pending: false
            };
        case ACCEPT_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload,
                pending: false
            };
        case ARRIVE_ORDER_REQUEST:
            return {
                ...state,
                pending: true
            };
        case ARRIVE_ORDER_SUCCESS:
            return {
                ...state,
                status: orderStatuses.arrived,
                pending: false
            };
        case ARRIVE_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload,
                pending: false
            };
        case COMPLETE_ORDER_REQUEST:
            return {
                ...state,
                pending: true
            };
        case COMPLETE_ORDER_SUCCESS:
            return {
                ...state,
                status: orderStatuses.completed,
                pending: false
            };
        case COMPLETE_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload,
                pending: false
            };
        default:
            return state;
    }
};

export default orderReducer;
