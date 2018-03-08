import { createSelector } from 'reselect';

export const getUser = state => state.auth.user;

export const getFacebookInfo = createSelector(getUser, user => {
    return (
        user &&
        user.providerData.find(data => data.providerId === 'facebook.com')
    );
});
