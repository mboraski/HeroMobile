import firebase from '../firebase';
import * as api from '../api/hasty';
import { dropdownAlert } from './uiActions';

export const ADD_CARD = 'add_card';
export const ADD_CARD_SUCCESS = 'add_card_success';
export const ADD_CARD_FAIL = 'add_card_fail';
export const DELETE_CARD = 'delete_card';
export const DELETE_CARD_SUCCESS = 'delete_card_success';
export const DELETE_CARD_FAIL = 'delete_card_fail';
export const LIST_CARDS = 'list_cards';
export const LIST_CARDS_SUCCESS = 'list_cards_success';
export const LIST_CARDS_FAIL = 'list_cards_fail';
export const SELECTED_CARD = 'selected_card';
export const SUBMIT_PAYMENT_REQUEST = 'submit_payment_request';
export const SUBMIT_PAYMENT_SUCCESS = 'submit_payment_success';
export const SUBMIT_PAYMENT_FAILURE = 'submit_payment_failure';

export const submitPaymentRequest = () => dispatch => dispatch({ type: SUBMIT_PAYMENT_REQUEST });

export const submitPayment = (
    navigation,
    cardId,
    totalCost,
    notes,
    orderId,
    cart
    ) => async dispatch => {
        // TODO: do something with notes
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const charge = {
            amount: Math.ceil(totalCost),
            currency: 'usd',
            source: cardId
        };
        return api.chargeStripeCustomerSource({ uid, charge, notes, orderId, cart })
            .then(() => {
                dropdownAlert(true, 'Payment success');
                dispatch({ type: SUBMIT_PAYMENT_SUCCESS });
                navigation.navigate('deliveryStatus');
            })
            .catch(() => {
                dropdownAlert(true, 'Error submitting payment');
                dispatch({ type: SUBMIT_PAYMENT_FAILURE });
            });
        };

export const addCard = (...args) => async dispatch => {
    try {
        dispatch({ type: ADD_CARD });
        const res = await api.addStripeCustomerSource(...args);
        dispatch({ type: ADD_CARD_SUCCESS });
        dispatch(dropdownAlert(true, 'Successfully added card!'));
        return res;
    } catch (error) {
        dispatch(dropdownAlert(true, 'Failed to add card!'));
        dispatch({
            type: ADD_CARD_FAIL,
            error
        });
        throw error;
    }
};

export const deleteCard = (...args) => async dispatch => {
    try {
        dispatch({ type: DELETE_CARD });
        const res = await api.removeStripeCustomerSource(...args);
        dispatch({ type: DELETE_CARD_SUCCESS });
        dispatch(dropdownAlert(true, 'Successfully deleted card!'));
        return res;
    } catch (error) {
        dispatch(dropdownAlert(true, 'Failed to delete card!'));
        dispatch({
            type: DELETE_CARD_FAIL,
            error
        });
        throw error;
    }
};

export const listCards = uid => async dispatch => {
    // try {
    //     dispatch({ type: LIST_CARDS });
    //     const docRef = firebase.firestore().collection('userOwned').doc(uid);
    //     const doc = await docRef.get();
    //     if (doc.exists) {
    //         const data = doc.data();
    //         dispatch({
    //             type: LIST_CARDS_SUCCESS,
    //             payload: data
    //         });
    //         dispatch({
    //             type: SELECTED_CARD,
    //             payload: data
    //         });
    //         return data;
    //     } else {
    //         throw new Error('No such record of payment info!');
    //     }
    // } catch (error) {
    //     dispatch(dropdownAlert(true, 'No payment record on file!'));
    //     dispatch({
    //         type: LIST_CARDS_FAIL,
    //         error
    //     });
    //     throw error;
    // }
};

export const selectCard = (card) => dispatch => {
    dispatch({ type: SELECTED_CARD, payload: card.id });
};
