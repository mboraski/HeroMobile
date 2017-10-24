// Third Party Imports
import { StackNavigator } from 'react-navigation';

// Relative Imports
import HeroMainScreen from '../screens/HeroMainScreen';
import ManageInventoryScreen from '../screens/ManageInventoryScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import PaymentInfoScreen from '../screens/PaymentInfoScreen';

const MainNavigator = StackNavigator({
    heroMain: { screen: HeroMainScreen },
    manageInventory: { screen: ManageInventoryScreen },
    history: { screen: HistoryScreen },
    contactUs: { screen: ContactUsScreen },
    paymentInfo: { screen: PaymentInfoScreen }
    }, {
        navigationOptions: {
            tabBarVisible: false
        },
        lazy: true
    });

export default MainNavigator;
