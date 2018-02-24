import { StyleSheet, Platform, StatusBar } from 'react-native';

import { emY } from '../utils/em';

const header = {
    backgroundColor: '#fff',
    height: emY(5.3125),
    shadowRadius: 0,
    shadowOffset: {
        height: 0
    },
    shadowColor: 'transparent',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, .3)',
    ...Platform.select({
        android: {
            paddingTop: StatusBar.currentHeight,
            elevation: 0
        }
    })
};

export default StyleSheet.create({
    header,
    headerLarge: {
        ...header,
        height: emY(5.9375)
    },
    headerBorderless: {
        ...header,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent'
    },
    headerTitle: {
        alignSelf: 'center',
        fontWeight: 'normal'
    },
    shadow: Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 7 },
            shadowOpacity: 0.15,
            shadowRadius: 6
        },
        android: {
            elevation: 2
        }
    })
});
