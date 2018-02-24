import React, { Component } from 'react';
import { connect } from 'react-redux';

import MenuButton from './MenuButton';
import BackButton from './BackButton';

function isPushed(state, result = false) {
    if (state.routes) {
        return isPushed(state.routes[state.index], state.index > 0);
    }
    return result;
}

class MenuAndBackButton extends Component {
    onBack = () => {
        this.props.navigation.goBack();
    };
    render() {
        const { nav, navigation } = this.props;
        if (isPushed(nav)) {
            return <BackButton navigation={navigation} onPress={this.onBack} />;
        }
        return <MenuButton navigation={navigation} />;
    }
}

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(MenuAndBackButton);
