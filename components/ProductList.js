// Third Party Imports
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import _ from 'lodash';

// Relative Imports
import ProductDetail from './ProductDetail';
import { emY } from '../utils/em';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ProductList extends Component {
    state = {
        products: []
    };

    componentWillMount() {
        // TODO: fetch available products once endpoint complete
        this.setState({
            products: [
                {
                    title: 'Redbull',
                    thumbnail_image: 'https://facebook.github.io/react/img/logo_og.png',
                    price: '$3.49'
                },
                {
                    title: 'Monster',
                    thumbnail_image: 'https://facebook.github.io/react/img/logo_og.png',
                    price: '$3.49',
                    added: true
                },
                {
                    title: 'Gatorade',
                    thumbnail_image: 'https://facebook.github.io/react/img/logo_og.png',
                    price: '$2.49'
                },
                {
                    title: 'Water',
                    thumbnail_image: 'https://facebook.github.io/react/img/logo_og.png',
                    price: '$0.99'
                }
            ]
        });
    }

    renderProducts() {
        // TODO: change key to some other id
        return _.map(this.state.products, product =>
            <ProductDetail
                key={product.title}
                product={product}
                callAddToCart={this.props.callAddToCart}
                style={{
                    width: SCREEN_WIDTH / 2 - 21,
                    marginRight: 8,
                    marginBottom: emY(0.625)
                }}
            />
        );
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {this.renderProducts()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingRight: 5
    }
});

export default ProductList;
