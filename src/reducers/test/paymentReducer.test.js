// TODO: Remove when tests implemented
test.only('real recognize real', () => {
    expect('real').toBe('real');
});
// import '../../mocks/firebase';
//
// import {
//     ADD_CARD,
//     ADD_CARD_SUCCESS,
//     ADD_CARD_FAIL,
//     DELETE_CARD,
//     DELETE_CARD_SUCCESS,
//     DELETE_CARD_FAIL,
//     LIST_CARDS,
//     LIST_CARDS_SUCCESS,
//     LIST_CARDS_FAIL
// } from '../../actions/paymentActions';
// import reducer, { initialState } from '../paymentReducer';
//
// describe('mapReducer', () => {
//     it('handles ADD_CARD action', () => {
//         expect(reducer(initialState, { type: ADD_CARD })).toMatchSnapshot();
//     });
//     it('handles ADD_CARD_SUCCESS action', () => {
//         expect(
//             reducer(initialState, { type: ADD_CARD_SUCCESS })
//         ).toMatchSnapshot();
//     });
//     it('handles ADD_CARD_FAIL action', () => {
//         expect(
//             reducer(initialState, { type: ADD_CARD_FAIL, error: 'error' })
//         ).toMatchSnapshot();
//     });
//     it('handles DELETE_CARD action', () => {
//         expect(reducer(initialState, { type: DELETE_CARD })).toMatchSnapshot();
//     });
//     it('handles DELETE_CARD_SUCCESS action', () => {
//         expect(
//             reducer(initialState, { type: DELETE_CARD_SUCCESS })
//         ).toMatchSnapshot();
//     });
//     it('handles DELETE_CARD_FAIL action', () => {
//         expect(
//             reducer(initialState, { type: DELETE_CARD_FAIL, error: 'error' })
//         ).toMatchSnapshot();
//     });
//     it('handles LIST_CARDS action', () => {
//         expect(reducer(initialState, { type: LIST_CARDS })).toMatchSnapshot();
//     });
//     it('handles LIST_CARDS_SUCCESS action', () => {
//         expect(
//             reducer(initialState, {
//                 type: LIST_CARDS_SUCCESS,
//                 payload: { paymentInfo: { data: 'mockdata' } }
//             })
//         ).toMatchSnapshot();
//     });
//     it('handles LIST_CARDS_FAIL action', () => {
//         expect(
//             reducer(initialState, { type: LIST_CARDS_FAIL, error: 'error' })
//         ).toMatchSnapshot();
//     });
// });
