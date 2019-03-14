// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { connect } from 'react-redux';
import { Constants } from 'expo';

// Relative Imports
import { placesAutocomplete } from '../actions/googleMapsActions';
import { getCurrentLocation } from '../actions/mapActions';
import { toggleSearch } from '../actions/uiActions';

import DebounceTextInput from '../components/DebounceTextInput';
import BackButton from '../components/BackButton';
import CloseButton from '../components/CloseButton';
import MenuButton from '../components/MenuButton';
import CartButton from '../components/CartButton';
import Text from '../components/Text';

import { getSearchVisible } from '../selectors/uiSelectors';
import { getPending } from '../selectors/mapSelectors';
import { getProductsPending } from '../selectors/productSelectors';

import Style from '../constants/Style';

const OPACITY_DURATION = 300;
const REVERSE_CONFIG = {
    inputRange: [0, 1],
    outputRange: [1, 0]
};

class ProductsHeaderContainer extends Component {
    state = {
        opacity: new Animated.Value(1),
        inputText: '',
        searchRendered: false
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.searchVisible !== nextProps.searchVisible) {
            this.animate(nextProps.searchVisible);
        }
    }

    animate = searchVisible => {
        if (this.state.searchRendered) {
            this.afterSetState(searchVisible);
        } else {
            this.setState({ searchRendered: searchVisible }, () =>
                this.afterSetState(searchVisible)
            );
        }
    };

    afterSetState = searchVisible => {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: searchVisible ? 0 : 1,
                duration: OPACITY_DURATION
            })
        ]).start(() => {
            this.setState({
                searchRendered: searchVisible
            });
            if (searchVisible) {
                this.input.component.focus();
            }
        });
    };

    placesAutocomplete = text => {
        this.props.placesAutocomplete(text);
    };

    closeSearch = () => {
        this.props.toggleSearch();
    };

    clearSearch = () => {
        this.setState({
            inputText: ''
        });
    };

    handleInput = inputText => {
        this.setState({
            inputText
        });
    };

    render() {
        const { pending } = this.props;
        const { opacity, searchRendered, inputText } = this.state;
        return (
            <View style={styles.wrapper}>
                <Animated.View style={[Style.header, { opacity }]}>
                    <View style={styles.headerRow}>
                        <MenuButton
                            style={Style.headerLeft}
                            disabled={pending}
                        />
                        <Text
                            style={[Style.headerTitle, Style.headerTitleLogo]}
                        >
                            Hasty
                        </Text>
                        <CartButton />
                    </View>
                </Animated.View>
                {searchRendered ? (
                    <Animated.View
                        style={[
                            Style.header,
                            styles.header,
                            { opacity: opacity.interpolate(REVERSE_CONFIG) }
                        ]}
                    >
                        <View style={Style.appBar}>
                            <View style={Style.headerLeftContainer}>
                                <BackButton
                                    style={Style.headerLeft}
                                    onPress={this.closeSearch}
                                />
                            </View>
                            <DebounceTextInput
                                ref={c => (this.input = c)}
                                style={Style.headerTitleContainer}
                                placeholder="Enter Address"
                                onDebounce={this.placesAutocomplete}
                                value={inputText}
                                onChangeText={this.handleInput}
                            />
                            <View style={Style.headerRightContainer}>
                                <CloseButton
                                    style={Style.headerRight}
                                    onPress={this.clearSearch}
                                />
                            </View>
                        </View>
                    </Animated.View>
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight
    },
    header: {
        position: 'absolute',
        top: Constants.statusBarHeight,
        left: 0,
        right: 0,
        bottom: 0
    },
    headerRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

const mapStateToProps = state => ({
    searchVisible: getSearchVisible(state),
    pending: getPending(state) || getProductsPending(state)
});

const mapDispatchToProps = {
    placesAutocomplete,
    toggleSearch,
    getCurrentLocation
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsHeaderContainer);
