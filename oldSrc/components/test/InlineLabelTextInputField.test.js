// TODO: Remove when tests implemented
test.only('real recognize real', () => {
    expect('real').toBe('real');
});
// import 'react-native';
// import React from 'react';
// import { shallow } from 'enzyme';
//
// import InlineLabelTextInputField, { InlineLabelTextInput } from '../InlineLabelTextInputField';
//
// describe('InlineLabelTextInputField', () => {
//     it('field renders correctly', () => {
//         const render = shallow(<InlineLabelTextInputField textInputName={'Test_Input_Name'} />);
//         expect(render).toMatchSnapshot();
//     });
//     it('component renders correctly', () => {
//         const input = {};
//         const meta = {
//             touched: false,
//             invalid: false,
//             error: null
//         };
//         const label = 'label';
//         const render = shallow(<InlineLabelTextInput input={input} meta={meta} label={label} />);
//         expect(render).toMatchSnapshot();
//     });
//     it('component renders correctly with error', () => {
//         const input = {};
//         const meta = {
//             touched: true,
//             invalid: true,
//             error: 'error'
//         };
//         const label = 'label';
//         const render = shallow(<InlineLabelTextInput input={input} meta={meta} label={label} />);
//         expect(render).toMatchSnapshot();
//     });
// });
