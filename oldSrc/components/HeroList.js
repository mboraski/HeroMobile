// Third Party Imports
import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

// Relative Imports
import HeroDetail from './HeroDetail';
import { emY } from '../utils/em';

export class HeroList extends Component {
    state = {
        heroes: [
            {
                id: 1,
                name: 'Jessica Morgan',
                type: 'Instant',
                delivery_time: 4,
                image: 'https://facebook.github.io/react/img/logo_og.png'
            },
            {
                id: 2,
                name: 'Matt Littlefield',
                type: 'Fast',
                delivery_time: 16,
                image: 'https://facebook.github.io/react/img/logo_og.png'
            }
        ],
        filteredHeroes: []
    };

    componentWillReceiveProps() {
        const newHeroList = _.filter(
            this.state.heroes,
            hero => this.props.i < hero.id
        );

        this.setState({ filteredHeroes: newHeroList });
    }

    renderHeroes() {
        return _.map(this.state.filteredHeroes, hero => (
            <HeroDetail key={hero.id} hero={hero} />
        ));
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
    container: {}
});

const mapStateToProps = ({ notification }) => ({ i: notification.index });

const mapDispatchToProps = function(dispatch) {
    return {
        actions: {}
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeroList);
