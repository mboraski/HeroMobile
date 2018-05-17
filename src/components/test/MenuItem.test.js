// TODO: Remove when tests implemented
test.only('real recognize real', () => {
    expect('real').toBe('real');
});
// import 'react-native';
// import React from 'react';
// import { shallow } from 'enzyme';
// import configureStore from 'redux-mock-store';
//
// import MenuItem from '../MenuItem';
// import notificationIcon from '../../assets/icons/notification.png';
//
// const initialState = {};
//
// describe('MenuItem', () => {
//     const middlewares = [];
//     const mockStore = configureStore(middlewares);
//     it('renders correctly', () => {
//         const wrapper = shallow(
//             <MenuItem image={notificationIcon} title="Notifications" badge="3" />,
//             {
//                 context: { store: mockStore(initialState) }
//             }
//         );
//         const render = wrapper.dive();
//         expect(render).toMatchSnapshot();
//     });
//     it('handles press correctly', () => {
//         const route = { key: 'routeName' };
//         const activeItemKey = 'routeName';
//         const focused = true;
//         const onPress = jest.fn();
//         const wrapper = shallow(
//             <MenuItem
//                 route={route}
//                 activeItemKey={activeItemKey}
//                 onPress={onPress}
//                 image={notificationIcon}
//                 title="Notifications"
//                 badge="3"
//             />,
//             {
//                 context: { store: mockStore(initialState) }
//             }
//         );
//         wrapper.instance().onPress();
//         expect(onPress.mock.calls[0][0]).toEqual({ route, focused });
//     });
// });
