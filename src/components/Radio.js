import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Text from './Text';
import { emY } from '../utils/em';

const RADIO_ICON_SIZE = emY(1.4375);
const RADIO_ICON_PADDING = 5;
const RADIO_ICON_SIZE_INNER = RADIO_ICON_SIZE - RADIO_ICON_PADDING;

const Radio = ({
    input,
    text,
    onPress = () => input.onChange(!input.value)
}) => (
    <TouchableOpacity {...input} {...rest} onPress={onPress}>
        <View style={styles.container}>
            <View
                style={[
                    styles.iconContainer,
                    input.value && styles.iconContainerSelected
                ]}
            >
                <MaterialIcons
                    name="check"
                    size={RADIO_ICON_SIZE_INNER}
                    color="#fff"
                    style={[
                        styles.radioIcon,
                        input.value && styles.radioIconSelected
                    ]}
                />
            </View>
            <Text style={styles.radioText}>{text}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: emY(1.875)
    },
    iconContainer: {
        width: RADIO_ICON_SIZE,
        height: RADIO_ICON_SIZE,
        borderRadius: RADIO_ICON_SIZE / 2,
        borderColor: '#000',
        borderWidth: StyleSheet.hairlineWidth,
        overflow: 'hidden',
        marginRight: 15,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainerSelected: {
        backgroundColor: 'black'
    },
    icon: {},
    iconSelected: {},
    radioText: {
        fontSize: emY(1)
    }
});

export default Radio;
