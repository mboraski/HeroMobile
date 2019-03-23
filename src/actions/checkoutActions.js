export const SET_DELIVERY_NOTES = 'SET_DELIVERY_NOTES';
export const SET_SALES_TAX_RATE = 'set_sales_tax_rate';
export const SET_SERVICE_FEE_RATE = 'set_service_fee_rate';
export const SET_DELIVERY_FEE = 'set_delivery_fee';
export const SET_DISCOUNT = 'set_discount';

export const setDeliveryNotes = notes => ({
    type: SET_DELIVERY_NOTES,
    payload: notes
});

export const setSalesTaxRate = salesTaxRate => ({
    type: SET_SALES_TAX_RATE,
    payload: salesTaxRate
});

export const setServiceFeeRate = serviceFeeRate => ({
    type: SET_SERVICE_FEE_RATE,
    payload: serviceFeeRate
});

export const setDeliveryFee = deliveryFee => ({
    type: SET_DELIVERY_FEE,
    payload: deliveryFee
});

export const setDiscount = discount => ({
    type: SET_DISCOUNT,
    payload: discount
});
