import { createSelector } from 'reselect';
// import reduce from 'lodash.reduce';

export const getInventory = state => state.contractor.inventory;
export const getMethod = state => state.contractor.method;
export const getOnline = state => state.contractor.online;
export const getStatus = state => state.contractor.status;
export const getPending = state => state.contractor.pending;
export const getError = state => state.contractor.error;
export const getFirstName = state => state.contractor.firstName;
export const getLastName = state => state.contractor.lastName;
export const getOrders = state => state.contractor.orders;

export const getInventoryTotalQuantity = createSelector(
    [getInventory],
    inventory => {
        const list = Object.keys(inventory);
        return list.length || 0;
    }
);
