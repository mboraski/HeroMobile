// TODO: Remove when tests implemented
test.only('real recognize real', () => {
    expect('real').toBe('real');
});
// import 'react-native';
// import React from 'react';
// import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
// import configureStore from 'redux-mock-store';
// import sinon from 'sinon';
// import { NativeModules } from 'react-native';
//
// import AuthScreen from '../AuthScreen';
//
// const initialState = {
//     signUp: true
// };
//
// describe('AuthScreen', () => {
//     const middlewares = [];
//     const mockStore = configureStore(middlewares);
//
//     it('renders correctly', () => {
//         const wrapper = shallow(<AuthScreen />, {
//             context: { store: mockStore(initialState) }
//         });
//         const render = wrapper.dive();
//         expect(render).toMatchSnapshot();
//     });
//
//
//     // it('sinon spy example, calls native module event', () => {
//     //     const spy = sinon.spy(NativeModules/* .moduleName */, /* functionName */);
//     //     const render = shallow(<AuthScreen />, {
//     //         context: { store: mockStore(initialState) }
//     //     });
//     //     // have to dive when component is redux container to get actual component
//     //     // const render = wrapper.dive();
//     //     render.find(/* componentName */).forEach(child => {
//     //         child.simulate(/* eventName */);
//     //     });
//     //     expect(spy.calledOnce).toBe(true);
//     // });
//
//     it('can open SignUpForm', () => {
//         const spy = sinon.spy();
//         const render = shallow(
//             <AuthScreen openSignUpForm={spy} />
//         );
//         render.instance().openSignUpForm();
//         expect(spy.args).toMatchSnapshot();
//         expect(render).toMatchSnapshot();
//     });
//
//     it('can open SignInForm', () => {
//         const spy = sinon.spy();
//         const render = shallow(
//             <AuthScreen openSignUpForm={spy} />
//         );
//         render.instance().openSignInForm();
//         expect(spy.args).toMatchSnapshot();
//         expect(render).toMatchSnapshot();
//     });
// });
