import { createSelector } from 'reselect';

export const getUser = state => state.auth.user;
export const getPending = state => state.auth.pending;
export const getError = state => state.auth.error;
export const getExpirationDate = state => state.auth.expirationDate;
export const getUserReadable = state => state.auth.userReadable || {};

export const getEmail = createSelector(
    [getUserReadable],
    userReadable => userReadable.email || 'unavailable@unavailable.com'
);

export const getPhoneNumber = createSelector(
    [getUserReadable],
    userReadable => userReadable.phoneNumber || 'unavailable'
);
