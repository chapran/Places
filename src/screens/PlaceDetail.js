import React, { Component } from 'react'
import { Text, SafeAreaView, View, Image, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { deletePlace } from '../store/actions'

class PlaceDetail extends Component {
    constructor(props) {
        super(props)
        const { height, width } = Dimensions.get('window')
        this.state = {
            viewMode: height > width ? 'portrait' : 'landscape'
        }
        Dimensions.addEventListener('change', this.handleOrientationChange)
    }

    handleOrientationChange = dims => {
        const { height, width } = dims.window
        this.setState({
            viewMode: height > width ? 'portrait' : 'landscape'
        })
    }

    onPlaceDelete = () => {
        const { selectedPlace, deletePlace } = this.props
        deletePlace(selectedPlace.key)
        this.props.navigator.pop()
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.handleOrientationChange)
    }

    render() {
        const { selectedPlace } = this.props
        const { image, name } = selectedPlace
        const { viewMode } = this.state
        const screenStyles = viewMode === 'portrait' ? styles.portraitScreen : styles.landscapeScreen
        const imageStyles = [styles.image, viewMode === 'portrait' ? styles.fullWidth : undefined]
        const infoContainerStyles = [styles.infoContainer, viewMode === 'portrait' ? styles.fullWidth : undefined]
        return (
            <SafeAreaView style={screenStyles}>
                <Image source={image} style={imageStyles} />
                <View style={infoContainerStyles}>
                    <Text style={styles.placeName}>{name}</Text>
                    <View>
                        <TouchableOpacity onPress={this.onPlaceDelete}>
                            <View style={styles.trashButton}>
                                <Icon name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'} size={30} color='red' />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    portraitScreen: {
        flexDirection: 'column'
    },
    landscapeScreen: {
        flexDirection: 'row'
    },
    image: {
        width: '50%',
        height: 200
    },
    infoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%'
    },
    fullWidth: {
        width: '100%'
    },
    placeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28
    },
    trashButton: {
        alignItems: 'center'
    }
})

const mapDispatchToProps = dispatch => ({
    deletePlace: key => dispatch(deletePlace(key))
})

export default connect(null, mapDispatchToProps)(PlaceDetail)