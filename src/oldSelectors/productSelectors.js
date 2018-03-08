import { createSelector } from 'reselect';

export const getDeliveryType = state => state.product.deliveryType;

export const getAvailableProducts = state => state.product.availableProducts;

export const getProductsByDeliveryType = createSelector(
    [getDeliveryType, getAvailableProducts],
    (deliveryType, products) => {
        const productsByDeliveryType = products[deliveryType] || {};
        return Object.keys(productsByDeliveryType).map(productCode => ({
            ...productsByDeliveryType[productCode],
            productCode,
            deliveryType
        }));
    }
);
