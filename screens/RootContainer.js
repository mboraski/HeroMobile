import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

// Relative Imports
import MenuNavigator from '../navigations/MenuNavigator';

class RootContainer extends Component {
    state = {
        drawerOpen: false,
        drawerDisabled: false
    };

    render() {
        const navigation = addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav
        });
        return <MenuNavigator navigation={navigation} />;
    }
}

const mapStateToProps = state => ({ isOpened: state.isOpened, nav: state.nav });

export default connect(mapStateToProps)(RootContainer);
