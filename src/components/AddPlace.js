import React from 'react'
import { StyleSheet } from 'react-native'

import DefaultInput from './UI/DefaultInput'

const styles = StyleSheet.create({
    input: {
        width: '80%'
    }
})

const AddPlace = (props) => (
    <DefaultInput
        style={styles.input}
        placeholder='Place Name'
        {...props} />
)

export default AddPlace