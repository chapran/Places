import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

export default function DefaultInput(props) {
  const invalidStyle = (!props.valid && props.touched) ? styles.invalid : null
  return (
    <TextInput {...props} style={[styles.input, props.style, invalidStyle]} />
  )
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderColor: '#eee',
    borderWidth: 1,
    padding: 5,
    marginTop: 8,
    marginBottom: 8
  },
  invalid: {
    borderColor: 'red'
  }
})