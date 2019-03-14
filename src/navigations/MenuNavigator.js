// Third Party Imports
import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

// Relative Imports
import MenuContainer from '../containers/MenuContainer';
import MainNavigator from './MainNavigator';
import Dimensions from '../constants/Dimensions';

export default createDrawerNavigator(
    {
        mainNavigator: { screen: MainNavigator }
    },
    {
        drawerWidth: Dimensions.window.width * 0.7,
        drawerPosition: 'left',
        contentComponent: props => <MenuContainer {...props} />
    }
);
