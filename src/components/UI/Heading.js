import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function Heading(props) {
  return (
    <Text {...props} style={[styles.textHeading, props.style]}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
    textHeading: {
        fontSize: 28,
        fontWeight: 'bold'
    }
})
