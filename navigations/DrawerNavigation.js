import React from 'react';

// Third Party Imports
import { DrawerNavigator } from 'react-navigation';
import MenuContent from '../screens/MenuContent';

// Relative Imports
import TabNavigation from './TabNavigation';

const DrawerNavigation = DrawerNavigator({
    tabNavigation: { screen: TabNavigation }
}, {
    drawerWidth: 320,
    drawerPosition: 'left',
    contentComponent: () => <MenuContent />
});

export default DrawerNavigation;
