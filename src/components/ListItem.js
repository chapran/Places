import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        padding: 10,
        backgroundColor: '#eee',
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        marginRight: 8,
        height: 30,
        width: 30
    }
})

export default ({ placeName, placeImage }) => (
    <View style={styles.listItem}>
        <Image source={placeImage} style={styles.image} />
        <Text>
            {placeName}
        </Text>
    </View>
)
