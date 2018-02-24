// Third Party Imports
import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import _ from 'lodash';

// Relative Imports
import HeroDetail from './HeroDetail';
import { emY } from '../utils/em';

class HeroList extends Component {
    state = {
        heroes: []
    };

    componentWillMount() {
        this.setState({
            heroes: Array(4).fill().map((e, i) => ({
                id: i,
                name: 'Jessica Morgan',
                type: i % 2 ? 'Instant' : 'Driver',
                delivery_time: 4,
                image: 'https://facebook.github.io/react/img/logo_og.png'
            }))
        });
    }

    renderHeroes() {
        return _.map(this.state.heroes, hero =>
            <HeroDetail
                key={hero.id}
                hero={hero}
            />
        );
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {this.renderHeroes()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    }
});

export default HeroList;
