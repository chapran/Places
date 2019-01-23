import React, { Component } from 'react'
import { View, Button, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import AddPlace from '../components/AddPlace'
import { addPlace } from '../store/actions'
import Heading from '../components/UI/Heading'
import MainText from '../components/UI/MainText'
import PickImage from '../components/PickImage';
import PickLocation from '../components/PickLocation';

class SharePlace extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'orange'
    }

    constructor(props) {
        super(props)
        props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
        this.state = {
            placeName: ''
        }
    }

    onChange = val => {
        this.setState({
            placeName: val
        })
    }

    onNavigatorEvent = e => {
        if (e.type === 'NavBarButtonPress' && e.id === 'sideDrawerToggle') {
            this.props.navigator.toggleDrawer({
                side: 'left'
            })
        }
    }

    handleAddPlace = () => {
        const { placeName } = this.state
        if (placeName.trim() !== '') {
            this.props.onAddPlace(placeName)
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <MainText>
                    <Heading>Share a Place with us</Heading>
                </MainText>
                <PickImage />
                <PickLocation />
                <AddPlace
                    placeName={this.state.placeName}
                    onChange={this.onChange} />
                <View style={styles.button}>
                    <Button title='Share the Place' onPress={this.handleAddPlace} />
                </View>
            </ScrollView>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onAddPlace: name => dispatch(addPlace(name))
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
