// TODO: Remove when tests implemented
test.only('real recognize real', () => {
    expect('real').toBe('real');
});
// import 'react-native';
// import React from 'react';
// import { shallow } from 'enzyme';
// import configureStore from 'redux-mock-store';
//
// import MenuContent from '../MenuContent';
// import notificationIcon from '../../assets/icons/notification.png';
//
// const initialState = {};
//
// describe('MenuContent', () => {
//     const middlewares = [];
//     const mockStore = configureStore(middlewares);
//     const props = {
//         items: [
//             { key: 'cart' }
//         ],
//         activeItemKey: 'activeItemKey',
//         onItemPress: jest.fn()
//     };
//     it('renders correctly', () => {
//         const wrapper = shallow(<MenuContent {...props} />, {
//             context: { store: mockStore(initialState) }
//         });
//         const render = wrapper.dive();
//         expect(render).toMatchSnapshot();
//     });
// });
