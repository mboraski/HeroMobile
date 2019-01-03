import { createSelector } from 'reselect';
import _ from 'lodash';

import { getCartTotalQuantity, getCartInstantProducts } from './cartSelectors';

export const getItemCountUp = state => state.cart.itemCountUp;
export const getItemCountDown = state => state.cart.itemCountDown;
export const getProductsPending = state => state.product.pending;
export const getProductImages = state => state.product.productImages;
export const getCategory = state => state.product.category.toUpperCase();
export const getHeader = state => state.header;

export const getCategories = createSelector(
    [getCartInstantProducts],
    availableProducts => {
        if (availableProducts) {
            const uniqueCategories = {};
            // loop through all products and fetch their categories
            const triteCategories = _.map(
                availableProducts,
                product => product.categories
            );

            // run unique function over new mapped list
            _.forEach(triteCategories, categories =>
                _.forEach(categories, (category, key) => {
                    if (!uniqueCategories[key]) {
                        uniqueCategories[key] = key;
                    }
                })
            );
            // yay you now of list of categories (not all caps)
            return uniqueCategories;
        }
    }
);

export const getProductsByCategory = createSelector(
    [getCategory, getCartInstantProducts],
    (category, availableProducts) => {
        if (availableProducts) {
            return _.filter(
                availableProducts,
                product => product.categories[category.toLowerCase()]
            );
        }
    }
);

export const getNumberOfProducts = createSelector(
    [getProductsByCategory],
    products => products.length
);

const getProductsState = createSelector(
    [
        getCartInstantProducts,
        getCartTotalQuantity,
        getItemCountUp,
        getItemCountDown,
        getProductsPending,
        getProductsByCategory,
        getCategory,
        getCategories,
        getNumberOfProducts,
        getProductImages,
        getHeader
    ],
    (
        cart,
        cartQuantity,
        itemCountUp,
        itemCountDown,
        productPending,
        productsShown,
        category,
        categories,
        numberOfProducts,
        productImages,
        header
    ) => ({
        cart,
        cartQuantity,
        itemCountUp,
        itemCountDown,
        productPending,
        productsShown,
        category,
        categories,
        numberOfProducts,
        productImages,
        header
    })
);

export default getProductsState;
