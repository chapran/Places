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
            },
            locationChosen: false
        }
    }

    handlePickLocation = e => {
        const { latitude, longitude } = e.nativeEvent.coordinate
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude, longitude
        })
        this.setState(prevState => ({
            focusedLocation: {
                ...prevState.focusedLocation,
                latitude, longitude
            },
            locationChosen: true
        }))
        this.props.onLocationPick({
            latitude, longitude
        })
    }

    getLocation = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude, longitude
                    }
                }
            }
            this.handlePickLocation(coordsEvent)
        }, err => {
            console.log(err);
            alert('Fetching the position failed. Please choose one manually.')
        })
    }

    render() {
        const { focusedLocation, locationChosen } = this.state
        let marker = null

        if (locationChosen) {
            marker = <MapView.Marker coordinate={focusedLocation} />
        }
        return (
            <Fragment>
                <MapView
                    initialRegion={focusedLocation}
                    onPress={this.handlePickLocation}
                    ref={ref => this.map = ref}
                    style={styles.map}>
                    {marker}
                </MapView>
                <View style={styles.button}>
                    <Button title='Locate Me' onPress={this.getLocation} />
                </View>
            </Fragment>
        )
    }
}
