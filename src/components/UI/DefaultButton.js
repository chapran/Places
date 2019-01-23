import React from 'react'
import { TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform } from 'react-native'

export default function DefaultButton(props) {
    const content = (
        <View style={[styles.button, { backgroundColor: props.color }, props.disabled ? styles.disabled : null]}>
            <Text style={[styles.text, props.disabled ? styles.disabledText : null]}>{props.title}</Text>
        </View>
    )
    if (props.invalid) return content
    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        )
    }
    return (
        <TouchableOpacity onPress={props.onPress}>
            {content}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5
    },
    text: {
        color: '#fff'
    },
    disabled: {
        backgroundColor: '#eee',
        borderColor: '#aaa'
    },
    disabledText: {
        color: '#aaa'
    }
})