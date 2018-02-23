import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const DismissKeyboard = Comp => ({ children, ...props }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Comp {...props}>{children}</Comp>
        </TouchableWithoutFeedback>
    );

export default DismissKeyboard;
