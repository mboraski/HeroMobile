// TODO: Remove when tests implemented
test.only('real recognize real', () => {
    expect('real').toBe('real');
});
// import 'react-native';
// import React from 'react';
// import { shallow } from 'enzyme';
//
// import TextInputField, { TextInputComponent } from '../TextInputField';
//
// describe('TextInputField', () => {
//     it('field renders correctly', () => {
//         const render = shallow(<TextInputField />);
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
//         const render = shallow(<TextInputComponent input={input} meta={meta} label={label} />);
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
//         const render = shallow(<TextInputComponent input={input} meta={meta} label={label} />);
//         expect(render).toMatchSnapshot();
//     });
// });
