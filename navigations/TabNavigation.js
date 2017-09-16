// Third Party Imports
import React, { Component } from 'react'
import { TabNavigator } from 'react-navigation'

// Relative Imports
import HeroMainScreen from '../screens/HeroMainScreen'
import ManageInventoryScreen from '../screens/ManageInventoryScreen'
import HistoryScreen from '../screens/HistoryScreen'
import ContactUsScreen from '../screens/ContactUsScreen'
import PaymentInfoScreen from '../screens/PaymentInfoScreen'


const TabNavigation = TabNavigator({
    heroMain: { screen: HeroMainScreen },
    manageInventory: { screen: ManageInventoryScreen },
    history: { screen: HistoryScreen },
    contactUs: { screen: ContactUsScreen },
    paymentInfo: { screen: PaymentInfoScreen }
    }, {
      	tabBarPosition: 'bottom'
    })

export default TabNavigation
