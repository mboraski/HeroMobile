import { createSelector } from 'reselect';
import find from 'lodash.find';

export const getCards = state => state.payment.cards;
export const getPending = state => state.payment.pending;
export const getDefaultSource = state => state.payment.defaultSource;
export const getError = state => state.payment.error;
export const getStripeCustomerId = state => state.payment.stripeCustomerId;
export const getSelectedCard = state => state.payment.selectedCard;
export const getPaymentSource = state => state.payment.paymentSource;

export const getPaymentMethod = createSelector(
    [getDefaultSource, getCards, getPaymentSource],
    (defaultSource, cards, paymentSource) => {
        const cardId = paymentSource || defaultSource;
        const paymentMethod = find(cards, card => {
            return card.id === cardId;
        });
        return paymentMethod || cards[0] || {};
    }
);
