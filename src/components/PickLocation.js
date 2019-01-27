import React, { Component, Fragment } from 'react'
import { View, Button, StyleSheet, Dimensions } from 'react-native'
import MapView from 'react-native-maps'

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 250
    },
    button: {
        marginTop: 8,
        marginBottom: 8
    }
})

export default class PickLocation extends Component {
    constructor() {
        super()
        const { width, height } = Dimensions.get('window')
        this.state = {
            focusedLocation: {
                latitude: 37.7900352,
                longitude: -122.4013726,
                latitudeDelta: 0.0122,
                longitudeDelta: width / height * 0.0122
            }
        }
    }

    render() {
        return (
            <Fragment>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    style={styles.map} />
                <View style={styles.button}>
                    <Button title='Locate Me' onPress={() => { }} />
                </View>
            </Fragment>
        )
    }
}
