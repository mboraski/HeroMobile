import React, { Component } from 'react';
import { connect } from 'react-redux';

// Relative Imports
import DrawerNavigation from '../navigations/DrawerNavigation';

class RootContainer extends Component {
    state = {
        drawerOpen: false,
        drawerDisabled: false,
    }

    render() {
        return (
            <DrawerNavigation />
        );
    }
}

const mapStateToProps = state => ({ isOpened: state.isOpened });

const mapDispatchToProps = function (dispatch) {
    return {};
};
  
export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);

