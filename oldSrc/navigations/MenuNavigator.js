// Third Party Imports
import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

// Relative Imports
import MenuContainer from '../containers/MenuContainer';
import MainNavigator from './MainNavigator';

export default createDrawerNavigator(
    {
        mainNavigator: { screen: MainNavigator }
    },
    {
        drawerWidth: 300, // TODO: change to a percentage of the screen width
        drawerPosition: 'left',
        contentComponent: props => <MenuContainer {...props} />
    }
);
