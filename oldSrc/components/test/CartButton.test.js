// TODO: Remove when tests implemented
test.only('real recognize real', () => {
    expect('real').toBe('real');
});
// import 'react-native';
// import React from 'react';
// import { shallow } from 'enzyme';
// import configureStore from 'redux-mock-store';
//
// import CartButton from '../CartButton';
//
// const initialState = {};
//
// describe('CartButton', () => {
//     const middlewares = [];
//     const mockStore = configureStore(middlewares);
//     it('renders correctly', () => {
//         const wrapper = shallow(<CartButton />, {
//             context: { store: mockStore(initialState) }
//         });
//         const render = wrapper.dive();
//         expect(render).toMatchSnapshot();
//     });
//     it('navigates to cart on press', () => {
//         const navigation = {
//             navigate: jest.fn()
//         };
//         const wrapper = shallow(<CartButton navigation={navigation} />, {
//             context: { store: mockStore(initialState) }
//         });
//         const render = wrapper.dive();
//         render.instance().onPress();
//         expect(navigation.navigate.mock.calls[0][0]).toEqual('cart');
//     });
// });
