import React, { Component } from 'react'
import { View, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import AddPlace from '../components/AddPlace'
import { addPlace } from '../store/actions'
import Heading from '../components/UI/Heading'
import MainText from '../components/UI/MainText'
import PickImage from '../components/PickImage'
import PickLocation from '../components/PickLocation'
import validate from '../utils/validation'

const initialState = {
    controls: {
        placeName: {
            value: '',
            isValid: false,
            touched: false,
            validationRules: {
                minLength: 2
            }
        },
        location: {
            value: null,
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        }
    }
}

class SharePlace extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'orange'
    }

    constructor(props) {
        super(props)
        props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
        this.state = { ...initialState }
    }

    reset() {
        this.setState({ ...initialState })
        this.imagePicker.reset()
        this.locationPicker.reset()
    }

    onChange = value => {
        this.setState(prevState => ({
            controls: {
                ...prevState.controls,
                placeName: {
                    ...prevState.controls.placeName,
                    value,
                    isValid: validate(value, prevState.controls.placeName.validationRules),
                    touched: true
                }
            }
        }))
    }

    onNavigatorEvent = e => {
        if (e.type === 'NavBarButtonPress' && e.id === 'sideDrawerToggle') {
            this.props.navigator.toggleDrawer({
                side: 'left'
            })
        }
    }

    handleAddPlace = async () => {
        const { placeName, location, image } = this.state.controls
        const { navigator, onAddPlace } = this.props
        await onAddPlace(placeName.value, location.value, image.value)
        navigator.switchToTab({
            tabIndex: 0
        })
        this.reset()
    }

    handlePickLocation = location => {
        this.setState(prevState => ({
            controls: {
                ...prevState.controls,
                location: {
                    value: location,
                    isValid: true
                }
            }
        }))
    }

    handlePickImage = image => {
        this.setState(prevState => ({
            controls: {
                ...prevState.controls,
                image: {
                    value: image,
                    isValid: true
                }
            }
        }))
    }

    render() {
        const { placeName, location } = this.state.controls
        const isFormValid = placeName.isValid && location.isValid
        let submitButton = (
            <Button title='Share the Place' onPress={this.handleAddPlace} disabled={!isFormValid} />
        )
        if (this.props.isLoading) {
            submitButton = (
                <ActivityIndicator />
            )
        }
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <MainText>
                    <Heading>Share a Place with us</Heading>
                </MainText>
                <PickImage onImagePicked={this.handlePickImage} ref={ref => this.imagePicker = ref} />
                <PickLocation onLocationPick={this.handlePickLocation} ref={ref => this.locationPicker = ref} />
                <AddPlace
                    value={placeName.value}
                    touched={placeName.touched}
                    valid={placeName.isValid}
                    onChangeText={this.onChange} />
                <View style={styles.button}>
                    {submitButton}
                </View>
            </ScrollView>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onAddPlace: (name, location, image) => dispatch(addPlace(name, location, image))
})

const mapStateToProps = state => ({
    isLoading: state.ui.isLoading
})

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    button: {
        marginTop: 8,
        marginBottom: 8
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SharePlace)
