import { firestore } from '../firebase';
import * as api from '../api/hasty';

export const ADD_CARD = 'add_card';
export const ADD_CARD_SUCCESS = 'add_card_success';
export const ADD_CARD_FAIL = 'add_card_fail';

export const DELETE_CARD = 'delete_card';
export const DELETE_CARD_SUCCESS = 'delete_card_success';
export const DELETE_CARD_FAIL = 'delete_card_fail';

export const LIST_CARDS = 'list_cards';
export const LIST_CARDS_SUCCESS = 'list_cards_success';
export const LIST_CARDS_FAIL = 'list_cards_fail';

export const addCard = (...args) => async dispatch => {
    try {
        dispatch({ type: ADD_CARD });
        const res = await api.addStripeCustomerSource(...args);
        dispatch({ type: ADD_CARD_SUCCESS });
        return res;
    } catch (error) {
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
        return res;
    } catch (error) {
        dispatch({
            type: DELETE_CARD_FAIL,
            error
        });
        throw error;
    }
};

export const listCards = uid => async dispatch => {
    try {
        dispatch({ type: LIST_CARDS });
        const docRef = firestore.collection('userOwned').doc(uid);
        const doc = await docRef.get();
        if (doc.exists) {
            const data = doc.data();
            dispatch({
                type: LIST_CARDS_SUCCESS,
                payload: doc.data()
            });
            return data;
        } else {
            throw new Error('No such document with payment info!');
        }
    } catch (error) {
        dispatch({
            type: LIST_CARDS_FAIL,
            error
        });
        throw error;
    }
};
