import { createSelector } from 'reselect';

export const getUser = state => state.auth.user;

export const getFacebookInfo = createSelector(getUser, user =>
        user &&
        user.providerData.find(data => data.providerId === 'facebook.com')
);

export const getHero = createSelector(getUser, user => {
    return {};
});
