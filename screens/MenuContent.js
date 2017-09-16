import React, { Component, PropTypes } from 'react'
import {
    ScrollView,
    StyleSheet,
	Text,
	Image,
    TouchableOpacity,
	View,
	Switch
} from 'react-native'
import { Rating } from 'react-native-elements';

// Relative Imports
import { emY } from '../utils/em'
import Color from '../constants/Color'
import Location from '../components/MenuContent/Location'
import MenuItem from '../components/MenuContent/MenuItem'

import star from '../assets/icons/star.png'
import profile from '../assets/icons/profile.png'
import chat from '../assets/icons/chat2.png'
import settings from '../assets/icons/settings.png'
import about from '../assets/icons/about.png'

const IMAGE_CONTAINER_SIZE = emY(6.25)
  
export default class MenuContent extends Component {
  
	state = {
		name: 'Hanna Morgan',
		avatar: 'https://facebook.github.io/react/img/logo_og.png',
		age: '27',
		rate: 4,
		address: 'Boston, MA',
	}
	
    render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						<View style={styles.imageContainer}>
							<Image source={{ uri: this.state.avatar}} style={styles.image}/>
						</View>
						<Text style={styles.name}>{this.state.name}</Text>
						<View style={styles.ratingContainer}>
							<Rating
								imageSize={emY(0.8)}
								type='custom'
								ratingImage={star}
								ratingColor={Color.WHITE}
								ratingBackgroundColor={Color.WHITE}
								readonly
								ratingCount={this.state.rate}
								startingValue={this.state.rate}
								style={ styles.rating }
							/>
							<Text style={styles.title}>(27)</Text>
						</View>
						<Location address={this.state.address}/>
					</View>
					<View style={styles.switchContainer}>
						<Text style={styles.title}>OFFLINE</Text>
						<Switch onTintColor={Color.GREY_700} style=	{styles.switch} value={true}/>
						<Text style={styles.title}>ONLINE</Text>
					</View>
					<View style={styles.listContainer}>
						<MenuItem image={profile} title="View Profile"/>
						<MenuItem image={chat} title="Chat" badge="3"/>
						<MenuItem image={settings} title="Settings"/>
						<MenuItem image={about} title="About Us"/>
					</View>
					
				</View>
				<Text style={styles.copyright}>@2016 APP</Text>		
			</ScrollView>
		)
    }
}
  
const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: Color.WHITE
	},
	headerContainer: {
		alignItems: 'center',
		marginTop: emY(2.68)
	},
	imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
		justifyContent: 'center',
		width: IMAGE_CONTAINER_SIZE,
        height: IMAGE_CONTAINER_SIZE,
		marginBottom: emY(1)
	},
	image: {
        width: IMAGE_CONTAINER_SIZE,
        height: IMAGE_CONTAINER_SIZE,
		borderRadius: IMAGE_CONTAINER_SIZE / 2,
	},
	name: {
        color: Color.GREY_700,
        fontSize: emY(1.25),
        textAlign: 'center',
        marginBottom: emY(0.606)
	},
	ratingContainer: {
		flexDirection: 'row',
		marginBottom: emY(0.625)
	},
	title: {
        fontSize: emY(0.831),
        color: Color.GREY_700,
        textAlign: 'center',
	},
	switchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: emY(2.375),
		marginBottom: emY(4.934)
	},
	switch: {
		marginLeft: emY(0.8),
		marginRight: emY(0.8)
	},
	listContainer: {
		flexDirection: 'column',
		marginLeft: emY(1.2),
		borderTopWidth: 1,
        borderTopColor: Color.GREY_200
	},
	rating: {
		marginRight: emY(0.2),
	},
	copyright: {
		height: emY(1),
		marginTop: emY(4.56),
		fontSize: emY(0.831),
        color: Color.GREY_700,
        textAlign: 'center',
	}
})