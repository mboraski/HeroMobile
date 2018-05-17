// TODO: Remove when tests implemented
test.only('real recognize real', () => {
    expect('real').toBe('real');
});
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
//
// import '../../mocks/firebase';
// import {
//     signInWithFacebook,
//     signInWithEmailAndPassword,
//     signUp,
//     signOut,
//     updateAccount
// } from '../authActions';
//
// jest.mock('expo', () => ({
//     Facebook: {
//         logInWithReadPermissionsAsync: jest.fn(
//             () =>
//                 new Promise((resolve, reject) => {
//                     resolve({ token: 'token' });
//                 })
//         )
//     }
// }));
//
// describe('Testing Auth Actions', () => {
//     const middlewares = [thunk];
//     const mockStore = configureStore(middlewares);
//     const initialState = {};
//     const store = mockStore(initialState);
//
//     beforeEach(() => {
//         store.clearActions();
//     });
//
//     it('signInWithFacebook', async () => {
//         await store.dispatch(signInWithFacebook());
//         const actions = store.getActions();
//         expect(actions).toMatchSnapshot();
//     });
//
//     it('handles signInWithEmailAndPassword action', async () => {
//         await store.dispatch(
//             signInWithEmailAndPassword({
//                 email: 'email@email.com',
//                 password: 'password'
//             })
//         );
//         const actions = store.getActions();
//         expect(actions).toMatchSnapshot();
//     });
//     it('handles signUp action', async () => {
//         await store.dispatch(
//             signUp({
//                 email: 'email@email.com',
//                 password: 'password',
//                 name: 'name',
//                 number: '1112223333'
//             })
//         );
//         const actions = store.getActions();
//         expect(actions).toMatchSnapshot();
//     });
//     it('handles signOut action', async () => {
//         await store.dispatch(signOut());
//         const actions = store.getActions();
//         expect(actions).toMatchSnapshot();
//     });
//     it('handles updateAccount action', async () => {
//         await store.dispatch(
//             updateAccount('id', { name: 'name', number: '1112223333' })
//         );
//         const actions = store.getActions();
//         expect(actions).toMatchSnapshot();
//     });
// });
