import { StyleSheet, Platform } from 'react-native';
import { Constants } from 'expo';

import { emY } from '../utils/em';
import Color from './Color';

const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;
export const HEADER_ITEM_SIZE = emY(1.5);

const header = {
    backgroundColor: '#fff',
    height: emY(3),
    shadowRadius: 0,
    shadowOffset: {
        height: 0
    },
    shadowColor: 'transparent',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Color.GREY_600,
    ...Platform.select({
        android: {
            elevation: 0
        }
    })
};

const headerItem = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
};

export const statusBarOnly = Platform.select({
    android: {
        headerLeft: null,
        headerRight: null,
        headerStyle: {
            height: 0,
            borderBottomWidth: 0,
            backgroundColor: '#fff',
            shadowColor: 'transparent',
            shadowRadius: 0,
            shadowOffset: {
                height: 0
            }
        },
        paddingTop: Constants.statusBarHeight,
        elevation: 0
    },
    ios: {
        headerLeft: null,
        headerRight: null,
        headerStyle: {
            height: 0,
            borderBottomWidth: 0,
            backgroundColor: '#fff',
            shadowColor: 'transparent',
            shadowRadius: 0,
            shadowOffset: {
                height: 0
            }
        },
        paddingTop: Constants.statusBarHeight
    }
});

export default StyleSheet.create({
    header,
    headerLarge: {
        ...header,
        height: emY(5.25)
    },
    headerBorderless: {
        ...header,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent'
    },
    appBar: {
        flex: 1,
        paddingTop: 10
    },
    headerItem,
    headerTitleContainer: {
        ...headerItem,
        bottom: 0,
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
        top: 0,
        position: 'absolute',
        alignSelf: 'center'
    },
    headerLeftContainer: {
        ...headerItem,
        left: 0,
        bottom: 0,
        top: 0,
        position: 'absolute'
    },
    headerRightContainer: {
        ...headerItem,
        right: 0,
        bottom: 0,
        top: 0,
        position: 'absolute'
    },
    headerTitle: {
        ...headerItem,
        alignSelf: 'center',
        textAlign: 'center',
        color: 'rgba(0, 0, 0, .9)',
        marginHorizontal: 16,
        fontWeight: '500',
        fontSize: emY(1.2),
        fontFamily: 'roboto'
    },
    headerTitleLogo: {
        fontFamily: 'goodtimes',
        fontWeight: 'normal',
        fontSize: HEADER_ITEM_SIZE
    },
    headerLeft: {
        marginRight: 0,
        marginLeft: 20
    },
    headerRight: {
        marginRight: 20,
        marginLeft: 0
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
    }),
    backdropContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    clearText: {
        color: 'rgba(0, 0, 0, 0)'
    }
});
