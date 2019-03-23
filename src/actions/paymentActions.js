import * as api from '../api/hasty';
import { dropdownAlert } from './uiActions';

import { ORDER_CREATION_SUCCESS } from './orderActions';

export const UPDATE_STRIPE_INFO = 'update_stripe_info';
export const ADD_CARD_REQUEST = 'add_card_request';
export const ADD_CARD_SUCCESS = 'add_card_success';
export const ADD_CARD_FAIL = 'add_card_fail';
export const DELETE_CARD_REQUEST = 'delete_card_request';
export const DELETE_CARD_SUCCESS = 'delete_card_success';
export const DELETE_CARD_FAIL = 'delete_card_fail';
export const SELECTED_CARD = 'selected_card';
export const CHANGE_PAYMENT_METHOD = 'change_payment_method';
export const SUBMIT_PAYMENT_REQUEST = 'submit_payment_request';
export const SUBMIT_PAYMENT_SUCCESS = 'submit_payment_success';
export const SUBMIT_PAYMENT_FAILURE = 'submit_payment_failure';
export const CREATE_STRIPE_ACCOUNT_REQUEST = 'create_stripe_account_request';
export const CREATE_STRIPE_ACCOUNT_SUCCESS = 'create_stripe_account_success';
export const CREATE_STRIPE_ACCOUNT_ERROR = 'create_stripe_account_error';

export const submitPayment = values => async dispatch => {
    dispatch({ type: SUBMIT_PAYMENT_REQUEST });
    const {
        stripeCustomerId,
        source,
        description,
        totalCost,
        notes,
        cart,
        firstName,
        lastName,
        region,
        delivery
    } = values;
    try {
        if (!stripeCustomerId || !source || !totalCost || !cart) {
            dispatch(dropdownAlert(true, 'Missing payment related data.'));
            const missingDataError = new Error('Missing payment related data.');
            dispatch({
                type: SUBMIT_PAYMENT_FAILURE,
                error: missingDataError
            });
        } else {
            const res = await api.chargeStripeCustomerSource({
                customer: stripeCustomerId,
                source,
                description: description || '',
                totalCost: Math.ceil(totalCost),
                notes: notes || '',
                firstName,
                lastName,
                cart,
                region,
                delivery
            });
            const { orderId } = res.data;
            dispatch({ type: SUBMIT_PAYMENT_SUCCESS });
            dispatch({ type: ORDER_CREATION_SUCCESS, payload: orderId });
        }
        return;
    } catch (error) {
        dispatch(
            dropdownAlert(
                true,
                'Error submitting payment. You will not be charged.'
            )
        );
        dispatch({ type: SUBMIT_PAYMENT_FAILURE, payload: error });
        return;
    }
};

export const addCard = async args => {
    const { stripeCustomerId, token, dispatch } = args;
    dispatch({ type: ADD_CARD_REQUEST });
    try {
        if (!stripeCustomerId || !token) {
            dispatch(dropdownAlert(true, 'Missing customer data.'));
            const missingDataError = new Error(
                'Missing customer data like id.'
            );
            dispatch({
                type: ADD_CARD_FAIL,
                error: missingDataError
            });
        }
        const res = await api.addStripeCustomerSource({
            stripeCustomerId,
            token
        });
        dispatch(dropdownAlert(true, 'Successfully added card!'));
        const { defaultSource, sources } = res.data;
        dispatch({
            type: ADD_CARD_SUCCESS,
            payload: {
                defaultSource,
                sources
            }
        });
        return;
    } catch (error) {
        dispatch(dropdownAlert(true, 'Failed to add another card.'));
        // TODO: handle these errors like card declined
        dispatch({
            type: ADD_CARD_FAIL,
            payload: error
        });
        return;
    }
};

export const createStripeCustomerWithCard = async args => {
    const { email, token, dispatch } = args;
    dispatch({ type: CREATE_STRIPE_ACCOUNT_REQUEST });
    try {
        if (!email || !token) {
            dispatch(dropdownAlert(true, 'Missing user data like email.'));
            const missingDataError = new Error('Missing user data like email.');
            dispatch({
                type: CREATE_STRIPE_ACCOUNT_ERROR,
                error: missingDataError
            });
        }
        const res = await api.createStripeCustomerWithCard({ email, token });
        dispatch(dropdownAlert(true, 'Successfully added card!'));
        const { stripeCustomerId, defaultSource, sources } = res.data;
        dispatch({
            type: CREATE_STRIPE_ACCOUNT_SUCCESS,
            payload: {
                stripeCustomerId,
                defaultSource,
                sources
            }
        });
        return;
    } catch (error) {
        dispatch(dropdownAlert(true, 'Failed to add card!'));
        dispatch({
            type: CREATE_STRIPE_ACCOUNT_ERROR,
            payload: error
        });
        return;
    }
};

export const deleteCard = args => async dispatch => {
    const { stripeCustomerId, source } = args;
    dispatch({ type: DELETE_CARD_REQUEST });
    try {
        if (!stripeCustomerId || !source) {
            dispatch(dropdownAlert(true, 'Missing user data like id.'));
            const missingDataError = new Error('Missing user data like id.');
            dispatch({
                type: DELETE_CARD_FAIL,
                payload: missingDataError
            });
        }
        const res = await api.removeStripeCustomerSource({
            stripeCustomerId,
            source
        });
        dispatch({ type: DELETE_CARD_SUCCESS });
        dispatch(dropdownAlert(true, 'Successfully deleted card!'));
        return res;
    } catch (error) {
        dispatch(dropdownAlert(true, 'Failed to delete card!'));
        dispatch({
            type: DELETE_CARD_FAIL,
            payload: error
        });
    }
};

export const selectCard = card => dispatch => {
    dispatch({ type: SELECTED_CARD, payload: card.id });
};

export const changePaymentMethod = cardId => dispatch => {
    dispatch({ type: CHANGE_PAYMENT_METHOD, payload: cardId });
};
