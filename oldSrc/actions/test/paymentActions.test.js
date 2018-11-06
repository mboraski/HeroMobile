// TODO: Remove when tests implemented
test.only('real recognize real', () => {
    expect('real').toBe('real');
});
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import mockApi from '../../mocks/hastyApi';
// import '../../mocks/firebase';
//
// import { addCard, deleteCard, listCards } from '../paymentActions';
//
// import { firestore } from '../../firebase';
//
// const mockuid = 'mockuid';
// const mockdata = 'mockdata';
//
// firestore
//     .collection('userOwned')
//     .doc(mockuid)
//     .set(mockdata);
//
// describe('mapActions', () => {
//     const middlewares = [thunk];
//     const mockStore = configureStore(middlewares);
//     const initialState = {};
//     const store = mockStore(initialState);
//
//     beforeEach(() => {
//         store.clearActions();
//         mockApi.reset();
//     });
//
//     it('addCard', async () => {
//         mockApi.onAny().reply(200, { data: 'data' });
//         await store.dispatch(addCard());
//         const actions = store.getActions();
//         expect(actions).toMatchSnapshot();
//     });
//     it('deleteCard', async () => {
//         mockApi.onAny().reply(200, { data: 'data' });
//         await store.dispatch(deleteCard());
//         const actions = store.getActions();
//         expect(actions).toMatchSnapshot();
//     });
//     it('listCards', async () => {
//         mockApi.onAny().reply(200, { data: 'data' });
//         await store.dispatch(listCards(mockuid));
//         const actions = store.getActions();
//         expect(actions).toMatchSnapshot();
//     });
// });
