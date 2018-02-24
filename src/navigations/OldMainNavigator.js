// Third Party Imports
import { StackNavigator } from 'react-navigation';

// Relative Imports
import apiTester from '../screens/apiTester';
import HeroMainScreen from '../screens/HeroMainScreen';
import ManageInventoryScreen from '../screens/ManageInventoryScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import CreditCardScreen from '../screens/CreditCardScreen';

const MainNavigator = StackNavigator(
    {
        apiTester: { screen: apiTester },
        heroMain: { screen: HeroMainScreen },
        manageInventory: { screen: ManageInventoryScreen },
        history: { screen: HistoryScreen },
        contactUs: { screen: ContactUsScreen },
        paymentInfo: { screen: PaymentMethodScreen },
        creditCard: { screen: CreditCardScreen },
    },
    {
        initialRouteName: 'apiTester',
        navigationOptions: {
            tabBarVisible: false
        },
        lazy: true
    }
);

export default MainNavigator;
