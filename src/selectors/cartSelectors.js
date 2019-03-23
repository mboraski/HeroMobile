import { createSelector } from 'reselect';
import reduce from 'lodash.reduce';

import {
    getSalesTaxRate,
    getServiceFeeRate,
    getDeliveryFee,
    getDiscount
} from './checkoutSelectors';

export const getCartProducts = state => state.cart.products;
export const getCartImages = state => state.cart.images; //TODO: set images in this part of state
export const getItemCountUp = state => state.cart.products;
export const getItemCountDown = state => state.cart.products;
export const getCurrentSetAddress = state => state.cart.currentSetAddress;
export const getRegion = state => state.cart.region;

export const getCartInstantProducts = createSelector(
    [getCartProducts],
    products => products.instant
);

export const getCartTotalQuantity = createSelector(
    [getCartInstantProducts],
    products =>
        reduce(products, (acc, product) => acc + product.quantityTaken, 0)
);

export const getDeliveryTypes = createSelector(getCartProducts, products =>
    Object.keys(products)
);

/**
 * Turns product map into 1D array with code and type and removes orders with 0 quantity
 */
export const getCartOrders = createSelector(
    [getCartInstantProducts],
    products =>
        reduce(
            products,
            (accum, product) => {
                if (product.quantityTaken > 0) {
                    accum[product.id] = product;
                }
                return accum;
            },
            {}
        )
);

export const getHeroAvailables = createSelector([getCartOrders], products =>
    reduce(
        products,
        (accum, product) => {
            accum[product.id] = {
                id: product.id,
                quantityAvailable: product.quantityTaken
            };
            return accum;
        },
        {}
    )
);

export const getCartPureTotal = createSelector([getCartOrders], orders =>
    orders.reduce((acc, order) => acc + order.price * order.quantityTaken, 0)
);

export const getCartTax = createSelector(
    [getCartPureTotal, getSalesTaxRate],
    (total, taxRate) => total * taxRate
);

export const getCartServiceFee = createSelector(
    [getCartPureTotal, getCartTax, getServiceFeeRate],
    (total, tax, serviceFeeRate) => (total + tax) * serviceFeeRate
);

export const getCartCostTotal = createSelector(
    [
        getCartPureTotal,
        getCartTax,
        getCartServiceFee,
        getDeliveryFee,
        getDiscount
    ],
    (total, tax, serviceFee, deliveryFee, discount) =>
        total + tax + serviceFee + deliveryFee - discount
);
