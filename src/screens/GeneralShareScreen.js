// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import CloseButton from '../components/CloseButton';
import DoneButton from '../components/DoneButton';
import ShareButton from '../components/ShareButton';
import Text from '../components/Text';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';
import instagramIcon from '../assets/icons/instagram.png';
import twitterIcon from '../assets/icons/twitter.png';
import facebookIcon from '../assets/icons/facebook.png';
import tumblrIcon from '../assets/icons/tumblr.png';
import pinterestIcon from '../assets/icons/pinterest.png';
import messageIcon from '../assets/icons/message.png';
import mailIcon from '../assets/icons/mail.png';

class GeneralShareScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <ShareButton
                            style={styles.buton}
                            source={instagramIcon}
                        />
                        <Text style={styles.title}>Instagram</Text>
                    </View>
                    <View style={styles.col}>
                        <ShareButton
                            style={styles.buton}
                            source={twitterIcon}
                        />
                        <Text style={styles.title}>Twitter</Text>
                    </View>
                    <View style={styles.col}>
                        <ShareButton
                            style={styles.buton}
                            source={facebookIcon}
                        />
                        <Text style={styles.title}>Facebook</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <ShareButton style={styles.buton} source={tumblrIcon} />
                        <Text style={styles.title}>Tumblr</Text>
                    </View>
                    <View style={styles.col}>
                        <ShareButton
                            style={styles.buton}
                            source={pinterestIcon}
                        />
                        <Text style={styles.title}>Pinterest</Text>
                    </View>
                    <View style={styles.col}>
                        <ShareButton
                            style={styles.buton}
                            source={messageIcon}
                        />
                        <Text style={styles.title}>Messages</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <ShareButton style={styles.buton} source={mailIcon} />
                        <Text style={styles.title}>Mail</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.WHITE
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: emY(1.6)
    },
    col: {
        marginHorizontal: 22,
        alignItems: 'center'
    },
    buton: {
        borderColor: Color.BLACK,
        borderWidth: 1
    },
    title: {
        fontSize: emY(0.83),
        color: Color.BLACK,
        marginTop: emY(0.75)
    }
});

GeneralShareScreen.navigationOptions = {
    title: 'Share',
    headerLeft: <CloseButton />,
    headerRight: <DoneButton />,
    headerStyle: Style.header,
    headerTitleStyle: Style.headerTitle
};

export default connect(
    null,
    {}
)(GeneralShareScreen);
