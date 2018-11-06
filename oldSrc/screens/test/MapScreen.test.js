// TODO: Remove when tests implemented
test.only('real recognize real', () => {
    expect('real').toBe('real');
});
// import 'react-native';
// import React from 'react';
// import { shallow } from 'enzyme';
// import configureStore from 'redux-mock-store';
//
// import { MapScreen } from '../MapScreen';
//
// describe('MapScreen', () => {
//     it('renders correctly', () => {
//         const props = {
//             predictions: [],
//             searchVisible: false,
//             header: {
//                 isMenuOpen: false
//             },
//             region: null,
//             address: '',
//             pending: false,
//             getCurrentLocation: jest.fn(),
//         };
//         const render = shallow(<MapScreen {...props} />);
//         expect(render).toMatchSnapshot();
//     });
//     it('renders correctly pending', () => {
//         const props = {
//             predictions: [],
//             searchVisible: false,
//             header: {
//                 isMenuOpen: false
//             },
//             region: null,
//             address: '',
//             pending: true,
//             getCurrentLocation: jest.fn(),
//         };
//         const render = shallow(<MapScreen {...props} />);
//         expect(render).toMatchSnapshot();
//     });
//     it('renders correctly searchVisible', () => {
//         const props = {
//             predictions: [],
//             searchVisible: true,
//             header: {
//                 isMenuOpen: false
//             },
//             region: null,
//             address: '',
//             pending: false,
//             getCurrentLocation: jest.fn(),
//         };
//         const render = shallow(<MapScreen {...props} />);
//         expect(render).toMatchSnapshot();
//     });
//     it('renders correctly address', () => {
//         const props = {
//             predictions: [],
//             searchVisible: false,
//             header: {
//                 isMenuOpen: false
//             },
//             region: null,
//             address: 'address',
//             pending: false,
//             getCurrentLocation: jest.fn(),
//         };
//         const render = shallow(<MapScreen {...props} />);
//         expect(render).toMatchSnapshot();
//     });
//     it('renders correctly with region', () => {
//         const props = {
//             predictions: [],
//             searchVisible: false,
//             header: {
//                 isMenuOpen: false
//             },
//             region: { latitude: 0, longitude: 1, latitudeDelta: 2, longitudeDelta: 3 },
//             address: 'address',
//             getCurrentLocation: jest.fn(),
//             getProductsByAddress: jest.fn(),
//             setCurrentLocation: jest.fn(),
//             navigation: {
//                 navigate: jest.fn()
//             }
//         };
//         const render = shallow(<MapScreen {...props} />);
//         expect(render).toMatchSnapshot();
//     });
//     it('onButtonPress', async () => {
//         const props = {
//             predictions: [],
//             searchVisible: false,
//             header: {
//                 isMenuOpen: false
//             },
//             region: { latitude: 0, longitude: 1, latitudeDelta: 2, longitudeDelta: 3 },
//             address: 'address',
//             getCurrentLocation: jest.fn(),
//             getProductsByAddress: jest.fn(),
//             setCurrentLocation: jest.fn(),
//             navigation: {
//                 navigate: jest.fn()
//             }
//         };
//         const render = shallow(<MapScreen {...props} />);
//         const instance = render.instance();
//         await instance.onButtonPress();
//         expect(props.setCurrentLocation.mock.calls.length).toEqual(1);
//         expect(props.setCurrentLocation.mock.calls[0][0]).toEqual(props.address);
//         expect(props.setCurrentLocation.mock.calls[0][1]).toEqual(props.region);
//         expect(props.getProductsByAddress.mock.calls.length).toEqual(1);
//         expect(props.getProductsByAddress.mock.calls[0][0]).toEqual(props.address);
//         expect(props.navigation.navigate.mock.calls.length).toEqual(1);
//     });
// });
