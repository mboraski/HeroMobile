import React, { Component, PropTypes } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import Drawer from 'react-native-drawer'
import { connect } from 'react-redux'

import TabNavigation from '../navigations/TabNavigation'
import MenuContent from './MenuContent'

class RootContainer extends Component {

    state = {
        drawerOpen: false,
        drawerDisabled: false,
    }

    componentDidMount () {

    }

    closeDrawer = () => {
        this._drawer.close()
    }

    openDrawer = () => {
        this._drawer.open()
    }

    componentWillReceiveProps (nextProps) {
        console.log(nextProps)
    }

    render () {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                open = {this.props.isOpened}
                content={
                    <MenuContent closeDrawer={this.closeDrawer} />
                }
                acceptDoubleTap
                styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}}}
                onOpen={() => {
                    console.log('onopen')
                    this.setState({drawerOpen: true})
                }}
                onClose={() => {
                    console.log('onclose')
                    this.setState({drawerOpen: false})
                }}
                captureGestures={false}
                tweenDuration={100}
                panThreshold={0.08}
                disabled={this.state.drawerDisabled}
                openDrawerOffset={(viewport) => {
                    return 100
                }}
                closedDrawerOffset={() => 0}
                panOpenMask={0.2}
                negotiatePan >
                <TabNavigation/>
            </Drawer>      
        )
    }
}

const mapStateToProps = state => {
    console.log('======', state)
    return ({
    isOpened: state.isOpened
})
}

const mapDispatchToProps = dispatch => ({
    
})
  
export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)

