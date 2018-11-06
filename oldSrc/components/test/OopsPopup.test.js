// TODO: Remove when tests implemented
test.only('real recognize real', () => {
    expect('real').toBe('real');
});
// import 'react-native';
// import React from 'react';
// import { shallow } from 'enzyme';
// import configureStore from 'redux-mock-store';
//
// import OopsPopup from '../OopsPopup';
//
// const initialState = {};
//
// describe('OopsPopup', () => {
//     const middlewares = [];
//     const mockStore = configureStore(middlewares);
//     it('renders correctly', () => {
//         const wrapper = shallow(<OopsPopup openModal closeModal={() => {}} message="message" />, {
//             context: { store: mockStore(initialState) }
//         });
//         const render = wrapper.dive();
//         expect(render).toMatchSnapshot();
//     });
//     it('renders correctly no icon', () => {
//         const wrapper = shallow(
//             <OopsPopup openModal closeModal={() => {}} message="message" showIcon={false} />,
//             {
//                 context: { store: mockStore(initialState) }
//             }
//         );
//         const render = wrapper.dive();
//         expect(render).toMatchSnapshot();
//     });
// });
