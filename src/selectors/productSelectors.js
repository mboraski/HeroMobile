import { createSelector } from 'reselect';
import filter from 'lodash.filter';
import reduce from 'lodash.reduce';

import { getCartInstantProducts } from './cartSelectors';

export const getHeader = state => state.header;
export const getItemCountUp = state => state.cart.itemCountUp;
export const getItemCountDown = state => state.cart.itemCountDown;

export const getProductsPending = state => state.product.pending;
export const getError = state => state.product.error;
export const getAvailableProducts = state => state.product.instantProducts;
export const getCategory = state => state.product.category.toUpperCase();
export const getProductImages = state => state.product.productImages;

export const getCategories = createSelector(
    [getCartInstantProducts],
    instantProducts => {
        if (instantProducts) {
            const uniqueCategories = reduce(
                instantProducts,
                (accum, product) => {
                    if (accum.indexOf(product.category) === -1) {
                        accum.push(product.category);
                    }
                    return accum;
                },
                []
            );
            return uniqueCategories;
        }
    }
);

export const getProductsByCategory = createSelector(
    [getCategory, getCartInstantProducts],
    (category, instantProducts) => {
        if (instantProducts) {
            return filter(
                instantProducts,
                product => product.category === category.toLowerCase()
            );
        }
    }
);

export const getNumberOfProducts = createSelector(
    [getProductsByCategory],
    products => products.length
);
