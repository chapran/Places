import React from 'react'
import ListItem from './ListItem'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'

const PlaceList = ({ places, selectPlace }) => {
    return (
        <FlatList
            renderItem={info => (
                <TouchableOpacity onPress={() => selectPlace(info.item.key)}>
                    <ListItem placeName={info.item.name} placeImage={info.item.image} />
                </TouchableOpacity>
            )}
            style={styles.listContainer}
            data={places} />
    )
}

const styles = StyleSheet.create({
    listContainer: {
        width: '100%'
    }
})

export default PlaceList