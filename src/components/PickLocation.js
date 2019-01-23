import React, { Component, Fragment } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'

import MainText from '../components/UI/MainText'

const styles = StyleSheet.create({
    placeholder: {
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#eee',
        width: '80%',
        height: 200
    },
    button: {
        marginTop: 8,
        marginBottom: 8
    }
})

export default class PickLocation extends Component {
    render() {
        return (
            <Fragment>
                <View style={styles.placeholder}>
                    <MainText>
                        <Text>Map</Text>
                    </MainText>
                </View>
                <View style={styles.button}>
                    <Button title='Locate Me' onPress={() => {}} />
                </View>
            </Fragment>
        )
    }
}
