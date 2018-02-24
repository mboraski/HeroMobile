import { createSelector } from 'reselect';

import { getAvailableProducts } from './productSelectors';

export const getCartProducts = state => state.cart.products;

export const getDeliveryTypes = createSelector(getCartProducts, products => Object.keys(products));

/**
 * Turns product map into 1D array with code and type and removes orders with 0 quantity
 */
export const getCartOrders = createSelector(
    getCartProducts,
    getDeliveryTypes,
    (products, deliveryTypes) =>
        deliveryTypes
            .map(deliveryType =>
                Object.keys(products[deliveryType]).map(productCode => ({
                    ...products[deliveryType][productCode],
                    productCode,
                    deliveryType
                }))
            )
            .reduce((a, b) => a.concat(b), [])
            .filter(order => order.quantity > 0)
);

export const getCartTotalQuantity = createSelector(getCartOrders, orders =>
    orders.reduce((acc, order) => acc + order.quantity, 0)
);

export const getCartTotalCost = createSelector(getCartOrders, orders =>
    orders.reduce((acc, order) => acc + order.price * order.quantity, 0).toFixed(2)
);

/**
 * Cart order is available if the product of same type and code exists and has a quantity > 0
 */
export const getAvailableCartOrders = createSelector(
    [getAvailableProducts, getCartOrders],
    (products, orders) =>
        orders.map(order => {
            const product =
                products[order.deliveryType] && products[order.deliveryType][order.productCode];
            return {
                ...order,
                available: product && product.quantity > 0
            };
        })
);
