import React from 'react';
import 'react-native';
import { shallow } from 'enzyme';
import DropDown from '../DropDown';
import PaymentDropDownItem from '../PaymentDropDownItem';

describe('DropDown', () => {
    it('renders correctly', () => {
        const render = shallow(
            <DropDown header={<PaymentDropDownItem isHeaderItem />}>
                <PaymentDropDownItem isHeaderItem={false} />
                <PaymentDropDownItem isHeaderItem={false} />
            </DropDown>
        );
        expect(render).toMatchSnapshot();
    });
});
