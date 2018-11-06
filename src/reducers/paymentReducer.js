import {
    UPDATE_STRIPE_INFO,
    ADD_CARD_REQUEST,
    ADD_CARD_SUCCESS,
    ADD_CARD_FAIL,
    DELETE_CARD_REQUEST,
    DELETE_CARD_SUCCESS,
    DELETE_CARD_FAIL,
    SELECTED_CARD,
    SUBMIT_PAYMENT_REQUEST,
    SUBMIT_PAYMENT_SUCCESS,
    SUBMIT_PAYMENT_FAILURE,
    CREATE_STRIPE_ACCOUNT_REQUEST,
    CREATE_STRIPE_ACCOUNT_SUCCESS,
    CREATE_STRIPE_ACCOUNT_ERROR
} from '../actions/paymentActions';
import { SIGNOUT_SUCCESS } from '../actions/authActions';

const initialState = {
    cards: [],
    defaultSource: {},
    pending: false,
    selectedCard: {},
    error: null,
    stripeCustomerId: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SIGNOUT_SUCCESS:
            return initialState;
        case SUBMIT_PAYMENT_REQUEST:
            return {
                ...state,
                pending: true
            };
        case SUBMIT_PAYMENT_SUCCESS:
            return {
                ...state,
                pending: false
            };
        case SUBMIT_PAYMENT_FAILURE:
            return {
                ...state,
                pending: false
            };
        case ADD_CARD_REQUEST:
            return {
                ...state,
                pending: true
            };
        case ADD_CARD_SUCCESS:
            return {
                ...state,
                pending: false,
                cards: action.payload.sources.data,
                defaultSource: action.payload.defaultSource
            };
        case ADD_CARD_FAIL:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        case DELETE_CARD_REQUEST:
            return {
                ...state,
                pending: true
            };
        case DELETE_CARD_SUCCESS:
            return {
                ...state,
                pending: false
            };
        case DELETE_CARD_FAIL:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        case CREATE_STRIPE_ACCOUNT_REQUEST:
            return {
                ...state,
                pending: true
            };
        case CREATE_STRIPE_ACCOUNT_SUCCESS:
            return {
                ...state,
                pending: false,
                cards: action.payload.sources.data,
                defaultSource: action.payload.defaultSource,
                stripeCustomerId: action.payload.stripeCustomerId
            };
        case CREATE_STRIPE_ACCOUNT_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        case SELECTED_CARD:
            return {
                ...state,
                selectedCard: action.payload.paymentInfo
                    ? action.payload.paymentInfo.data[0]
                    : {},
                pending: false
            };
        case UPDATE_STRIPE_INFO:
            return {
                ...state,
                cards: action.payload.sources.data,
                defaultSource: action.payload.defaultSource,
                stripeCustomerId: action.payload.stripeCustomerId
            };
        default:
            return state;
    }
}
