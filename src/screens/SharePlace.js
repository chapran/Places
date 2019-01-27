import React, { Component } from 'react'
import { View, Button, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

import AddPlace from '../components/AddPlace'
import { addPlace } from '../store/actions'
import Heading from '../components/UI/Heading'
import MainText from '../components/UI/MainText'
import PickImage from '../components/PickImage';
import PickLocation from '../components/PickLocation';
import validate from '../utils/validation'

class SharePlace extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'orange'
    }

    constructor(props) {
        super(props)
        props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
        this.state = {
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
                }
            }
        }
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

    handleAddPlace = () => {
        const { placeName, location } = this.state.controls
        this.props.onAddPlace(placeName.value, location.value)
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

    render() {
        const { placeName, location } = this.state.controls
        const isFormValid = placeName.isValid && location.isValid
        return (
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={90}>
                <ScrollView contentContainerStyle={styles.container}>
                    <MainText>
                        <Heading>Share a Place with us</Heading>
                    </MainText>
                    <PickImage />
                    <PickLocation onLocationPick={this.handlePickLocation} />
                    <AddPlace
                        value={placeName.value}
                        touched={placeName.touched}
                        valid={placeName.isValid}
                        onChangeText={this.onChange} />
                    <View style={styles.button}>
                        <Button title='Share the Place' onPress={this.handleAddPlace} disabled={!isFormValid} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onAddPlace: (name, location) => dispatch(addPlace(name, location))
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

export default connect(null, mapDispatchToProps)(SharePlace)
