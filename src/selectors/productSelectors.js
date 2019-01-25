import { createSelector } from 'reselect';
import map from 'lodash.map';
import forEach from 'lodash.foreach';
import filter from 'lodash.filter';

import { getCartInstantProducts } from './cartSelectors';

export const getHeader = state => state.header;
export const getItemCountUp = state => state.cart.itemCountUp;
export const getItemCountDown = state => state.cart.itemCountDown;

export const getProductsPending = state => state.product.pending;
export const getError = state => state.product.error;
export const getAvailableProducts = state => state.product.availableProducts;
export const getCategory = state => state.product.category.toUpperCase();
export const getProducts = state => state.product.products;
export const getProductImages = state => state.product.productImages;

export const getCategories = createSelector(
    [getCartInstantProducts],
    availableProducts => {
        if (availableProducts) {
            const uniqueCategories = {};
            // loop through all products and fetch their categories
            const triteCategories = map(
                availableProducts,
                product => product.categories
            );

            // run unique function over new mapped list
            forEach(triteCategories, categories =>
                forEach(categories, (category, key) => {
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
            return filter(
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
