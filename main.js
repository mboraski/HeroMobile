// Third Party Imports
import React, { Component } from 'react';
import Expo from 'expo';
import { TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

// Relative Imports
import HeroMainScreen from './screens/HeroMainScreen';
import ManageInventoryScreen from './screens/ManageInventoryScreen';
import HistoryScreen from './screens/HistoryScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import PaymentInfoScreen from './screens/PaymentInfoScreen';
import store from './store';

class App extends Component {
  render() {
    const MainNavigator = TabNavigator({
      heroMain: { screen: HeroMainScreen },
      manageInventory: { screen: ManageInventoryScreen },
      history: { screen: HistoryScreen },
      contactUs: { screen: ContactUsScreen },
      paymentInfo: { screen: PaymentInfoScreen }
    }, {
      tabBarPosition: 'bottom'
    });

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);
