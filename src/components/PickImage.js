import React, { Component, Fragment } from 'react'
import { View, Button, StyleSheet, Image } from 'react-native'

import placeholder from '../assets/placeholder.jpg'

const styles = StyleSheet.create({
    placeholder: {
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#eee',
        width: '80%',
        height: 200
    },
    placeholderImage: {
        width: '100%',
        height: '100%'
    },
    button: {
        marginTop: 8,
        marginBottom: 8
    }
})

export default class PickImage extends Component {
    render() {
        return (
            <Fragment>
                <View style={styles.placeholder}>
                    <Image style={styles.placeholderImage} source={placeholder} resizeMode='cover' />
                </View>
                <View style={styles.button}>
                    <Button title='Pick image' onPress={() => alert('Pick Image!')} />
                </View>
            </Fragment>
        )
    }
}
