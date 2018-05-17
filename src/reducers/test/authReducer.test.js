// TODO: Remove when tests implemented
test.only('real recognize real', () => {
    expect('real').toBe('real');
});
// import {
//     signInWithFacebook,
//     signInWithEmailAndPassword,
//     signUp,
//     signOut,
//     updateAccount
// } from '../../actions/authActions';
// import reducer, { initialState } from '../authReducer';
//
// describe('Testing Auth Reducer', () => {
//     it('handles signInWithFacebook action', () => {
//         expect(reducer(initialState, signInWithFacebook())).toMatchSnapshot();
//     });
//     it('handles signInWithEmailAndPassword action', () => {
//         expect(
//             reducer(
//                 initialState,
//                 signInWithEmailAndPassword({ email: 'email', password: 'password' })
//             )
//         ).toMatchSnapshot();
//     });
//     it('handles signUp action', () => {
//         expect(
//             reducer(
//                 initialState,
//                 signUp({ email: 'email', password: 'password', name: 'name', number: '1112223333' })
//             )
//         ).toMatchSnapshot();
//     });
//     it('handles signOut action', () => {
//         expect(reducer(initialState, signOut())).toMatchSnapshot();
//     });
//     it('handles updateAccount action', () => {
//         expect(
//             reducer(initialState, updateAccount({ name: 'name', number: '1112223333' }))
//         ).toMatchSnapshot();
//     });
// });
