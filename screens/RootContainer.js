import React, { Component } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import Drawer from 'react-native-drawer'
import TabNavigation from '../navigations/TabNavigation'
import SideContent from './SideContent'

class RootContainer extends Component {

    state={
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

    render () {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={
                <SideContent closeDrawer={this.closeDrawer} />
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

export default RootContainer
