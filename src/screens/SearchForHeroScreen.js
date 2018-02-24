// bc JSX uses react.createElement etc, we need react in this file
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

// import axios from 'axios';
// import ProductList from '../components/ProductList';
// import { addToCart } from '../actions';
// import Menu from '../components/Menu';
// import CartScreen from './CartScreen';
// import SearchBar from '../components/common/SearchBar';

class SearchForHeroScreen extends Component {
  static navigationOptions = {
    headerLeft: (<Icon name="menu" size={40} />)
  }

  componentDidMount() {
    setTimeout(function(){
      console.log('Hero found');
    }, 8000);
    setTimeout(function(){
      console.log('Hero accepted');
    }, 12000);
    setTimeout(function(){
      console.log('Hero on the way!');
    }, 18000);
    setTimeout(function(){
      console.log('Hero has arrived!');
    }, 30000);
  }

  goToOrderStatus = () => {
    console.log('goToOrderStatus ran');
    // this.props.navigation.navigate('orderStatus');
    // this.props.addToCart(this.props.cart);
  }

  render() {
    // console.log(this.state);

    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        />
        {true &&
          <Text style={styles.loadingText}>Loading...</Text>
        }
        <Text style={styles.loadingText}>Located Heroes</Text>
        <View style={styles.heroItem}>
          <Image
            style={styles.profilePic}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          />
          <Text style={styles.name}>JESSICA MORGAN</Text>
          <Text style={styles.fillOrder}>Fullfills whole order</Text>
          <Text style={styles.deliveryTime}>Estimated Delivery Time: 4 min</Text>
          <Icon name="chat" size={30} color={'#555555'} />
        </View>
        <View style={styles.heroItem}>
          <Image
            style={styles.profilePic}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          />
          <Text style={styles.name}>THOME MELSON</Text>
          <Text style={styles.fillOrder}>Fullfills partial order</Text>
          <Text style={styles.deliveryTime}>Estimated Delivery Time: 9 min</Text>
          <Icon name="chat" size={30} color={'#555555'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  image: {
    flex: 1,
    minHeight: 90,
    width: null,
    backgroundColor: 'rgba(0,0,0,0.75)'
  },
  heroItem: {
    height: 60,
    flex: 1,
    width: null,
    borderTopColor: '#000000'
  },
  name: {
    fontSize: 12
  },
  fillOrder: {
    fontSize: 12
  },
  deliveryTime: {
    fontSize: 12
  }
})

export default connect(null, null)(SearchForHeroScreen);
