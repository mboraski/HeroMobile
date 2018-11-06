import {
    ADD_CARD,
    ADD_CARD_SUCCESS,
    ADD_CARD_FAIL,
    DELETE_CARD,
    DELETE_CARD_SUCCESS,
    DELETE_CARD_FAIL,
    LIST_CARDS,
    LIST_CARDS_SUCCESS,
    LIST_CARDS_FAIL
} from '../actions/paymentActions';

const initialState = {
    cards: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_CARD:
            return {
                ...state,
                pending: true
            };
        case ADD_CARD_SUCCESS:
            return {
                ...state,
                pending: false
            };
        case ADD_CARD_FAIL:
            return {
                ...state,
                pending: false,
                error: action.error
            };
        case DELETE_CARD:
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
                error: action.error
            };
        case LIST_CARDS:
            return {
                ...state,
                pending: true
            };
        case LIST_CARDS_SUCCESS:
            return {
                ...state,
                pending: false,
                cards: action.payload.paymentInfo
                    ? action.payload.paymentInfo.data
                    : [],
                error: null
            };
        case LIST_CARDS_FAIL:
            return {
                ...state,
                pending: false,
                error: action.error
            };
        default:
            return state;
    }
}
