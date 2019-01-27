import React, { Component, Fragment } from 'react'
import { View, Button, StyleSheet, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker'

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
    state = {
        pickedImage: null
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({
            title: 'Pick an image'
        }, res => {
            if(res.didCancel) {
                console.log('User didn`t pick any image.' )
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                const {uri, data} = res
                this.setState({
                    pickedImage: {
                        uri
                    }
                })
                this.props.onImagePicked({
                    uri, base64: data
                })
            }
        })
    }

    render() {
        return (
            <Fragment>
                <View style={styles.placeholder}>
                    <Image style={styles.placeholderImage} source={this.state.pickedImage} resizeMode='cover' />
                </View>
                <View style={styles.button}>
                    <Button title='Pick image' onPress={this.pickImageHandler} />
                </View>
            </Fragment>
        )
    }
}
