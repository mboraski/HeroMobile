// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { emY } from '../../utils/em';
import Color from '../../constants/Color';

const SIZE = emY(1.75);

type Props = {
    image: any,
    title: string,
    description: string
};

class Status extends Component {
    props: Props;

    render() {
        const { image, title, description } = this.props;

        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={image}
                    resizeMode="contain"
                />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: emY(7.25)
    },
    image: {
        maxWidth: SIZE,
        maxHeight: SIZE,
        marginBottom: emY(0.8)
    },
    title: {
        fontSize: emY(0.831),
        color: Color.GREY_500,
        textAlign: 'center',
        marginBottom: emY(0.2)
    },
    description: {
        fontSize: emY(1),
        color: Color.GREY_800,
        textAlign: 'center'
    }
});

const mapDispatchToProps = function(dispatch) {
    return {};
};

export default connect(
    null,
    mapDispatchToProps
)(Status);
