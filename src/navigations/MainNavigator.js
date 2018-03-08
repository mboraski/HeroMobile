// Third Party Imports
import { StackNavigator } from 'react-navigation';

// Relative Imports
import ApiTester from '../screens/ApiTester';
import SearchForHeroScreen from '../screens/SearchForHeroScreen';
// import PendingScreen from '../screens/PendingScreen';
import AuthScreen from '../screens/AuthScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import HeroMainScreen from '../screens/HeroMainScreen';
import DeliveryDetailScreen from '../screens/DeliveryDetailScreen';
import DeliveryNotesScreen from '../screens/DeliveryNotesScreen';
import DeliveryStatusScreen from '../screens/DeliveryStatusScreen';
import CartScreen from '../screens/CartScreen';
import CreditCardScreen from '../screens/CreditCardScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import PromotionShareScreen from '../screens/PromotionShareScreen';
import NotificationFeedbackScreen from '../screens/NotificationFeedbackScreen';


const MainNavigator = StackNavigator(
    {
        apiTester: { screen: ApiTester },
        auth: { screen: AuthScreen },
        // pending: { screen: PendingScreen },
        profile: { screen: ProfileScreen },
        map: { screen: MapScreen },
        home: { screen: HomeScreen },
        main: { screen: HeroMainScreen },
        searchForHero: { screen: SearchForHeroScreen },
        deliveryDetail: { screen: DeliveryDetailScreen },
        deliveryNotes: { screen: DeliveryNotesScreen },
        deliveryStatus: { screen: DeliveryStatusScreen },
        cart: { screen: CartScreen },
        creditCard: { screen: CreditCardScreen },
        paymentMethod: { screen: PaymentMethodScreen },
        checkout: { screen: CheckoutScreen },
        feedback: { screen: FeedbackScreen },
        promotionShare: { screen: PromotionShareScreen },
        notificationFeedback: { screen: NotificationFeedbackScreen }
    },
    {
        navigationOptions: {
            tabBarVisible: false
        },
        lazy: true
    }
);

export default MainNavigator;
