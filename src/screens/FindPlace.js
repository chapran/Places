import React, { Component } from 'react'
import { View, TouchableWithoutFeedback, Text, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'

import PlaceList from '../components/List'
import { getPlaces } from '../store/actions'

class FindPlace extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'orange'
    }

    state = {
        placesLoaded: false,
        removeAnimation: new Animated.Value(1),
        fadeInAnimation: new Animated.Value(0)
    }

    constructor(props) {
        super(props)
        props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    onNavigatorEvent = e => {
        if (e.type === 'ScreenChangedEvent' && e.id === 'willAppear') {
            this.props.getPlaces()
        } else if (e.type === 'NavBarButtonPress' && e.id === 'sideDrawerToggle') {
            this.props.navigator.toggleDrawer({
                side: 'left'
            })
        }
    }

    selectPlace = key => {
        const selectedPlace = this.props.places.find(place => place.key === key)
        this.props.navigator.push({
            screen: 'rn_udemy_app.PlaceDetail',
            title: selectedPlace.name,
            passProps: {
                selectedPlace
            }
        })
    }

    placesLoadedHandler = () => {
        Animated.timing(this.state.fadeInAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            })
            this.placesLoadedHandler()
        })
    }

    render() {
        const { placesLoaded, removeAnimation, fadeInAnimation } = this.state
        let content = (
            <Animated.View style={{
                opacity: removeAnimation,
                transform: [{
                    scale: removeAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [12, 1]
                    })
                }]
            }}>
                <TouchableWithoutFeedback onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Find Places</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        )
        if (placesLoaded) {
            content = (
                <Animated.View style={{
                    opacity: fadeInAnimation
                }}>
                    <PlaceList places={this.props.places} selectPlace={this.selectPlace} />
                </Animated.View>
            )
        }
        return (
            <View style={placesLoaded ? null : styles.buttonContainer}>
                {content}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchButton: {
        borderColor: 'orange',
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: 'orange',
        fontWeight: 'bold',
        fontSize: 26
    }
})

const mapStateTpProps = state => ({
    places: state.places.places
})

const mapDispatchToProps = dispatch => ({
    getPlaces: () => dispatch(getPlaces())
})

export default connect(mapStateTpProps, mapDispatchToProps)(FindPlace)
