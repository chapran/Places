import React from 'react'
import { StyleSheet } from 'react-native'

import DefaultInput from './UI/DefaultInput'

const styles = StyleSheet.create({
    input: {
        width: '80%'
    }
})

const AddPlace = ({ placeName, onChange }) => (
    <DefaultInput
        style={styles.input}
        placeholder='Place Name'
        value={placeName}
        onChangeText={onChange} />
)

export default AddPlace