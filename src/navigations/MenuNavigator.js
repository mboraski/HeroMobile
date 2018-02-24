// Third Party Imports
import React from 'react';
import { DrawerNavigator } from 'react-navigation';

// Relative Imports
import MenuContent from '../screens/MenuContent';
import MainNavigator from './MainNavigator';

const MenuNavgiator = DrawerNavigator({
    mainNavigator: { screen: MainNavigator }
}, {
    drawerWidth: 320, // TODO: change to a percentation of the screen width
    drawerPosition: 'left',
    contentComponent: props => <MenuContent {...props} />
});


export default MenuNavgiator;
