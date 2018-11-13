import { createSelector } from 'reselect';
import reduce from 'lodash.reduce';
import filter from 'lodash.filter';

import { getInventory } from './contractorSelectors';

export const getCartProducts = state => state.cart.products;
export const getCartImages = state => state.cart.images; //TODO: set images in this part of state
export const getItemCountUp = state => state.cart.products;
export const getItemCountDown = state => state.cart.products;
export const getDeliveryFee = state => state.cart.deliveryFee;
export const getTaxRate = state => state.cart.localSalesTaxRate;
export const getServiceRate = state => state.cart.serviceRate;
export const getServiceFee = state => state.cart.serviceFee;
export const getCurrentSetAddress = state => state.cart.currentSetAddress;
export const getRegion = state => state.cart.region;

export const getInventoryTotalQuantity = createSelector(
    [getInventory],
    products =>
        _.reduce(products, (acc, product) => acc + product.quantityTaken, 0)
);

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
export const getCartOrders = createSelector([getInventory], inventory =>
    _.reduce(
        inventory,
        (accum, product) => {
            if (product.quantityTaken > 0) {
                accum[product.productName] = product;
            }
            return accum;
        },
        {}
    )
);

export const getUpdateInventory = createSelector(
    [getCartInstantProducts, getInventory],
    (instantProducts, inventory) => {
        console.log('getUpdateInventory instantProducts: ', instantProducts);
        console.log('getUpdateInventory getInventory: ', inventory);
        const result = _.reduce(
            instantProducts,
            (accum, product) => {
                const takenProduct = inventory[product.productName];
                accum[product.productName] = product;
                if (takenProduct) {
                    accum[product.productName].quantityTaken =
                        takenProduct.quantityTaken;
                    console.log('accum: ', accum);
                }
                return accum;
            },
            {}
        );
        console.log('result: ', result);
        return result;
    }
);

export const getCartPureTotal = createSelector([getCartOrders], orders =>
    orders.reduce((acc, order) => acc + order.price * order.quantityTaken, 0)
);

export const getCartTaxTotal = createSelector(
    [getCartPureTotal, getTaxRate],
    (total, taxRate) => total * taxRate
);

export const getCartServiceCharge = createSelector(
    [getCartPureTotal, getServiceRate],
    (total, serviceRate) => total * serviceRate
);

export const getCartCostTotal = createSelector(
    [getCartPureTotal, getCartServiceCharge, getDeliveryFee, getServiceFee],
    (total, serviceCharge, deliveryFee, serviceFee) =>
        total + serviceCharge + deliveryFee + serviceFee
);
