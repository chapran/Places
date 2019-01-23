import React, { Component } from 'react'
import { SafeAreaView, Text, Dimensions, StyleSheet, TouchableOpacity, View, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class SideDrawer extends Component {
    render() {
        return (
            <SafeAreaView style={[styles.container, { width: Dimensions.get('window').width * 0.8 }]}>
                <TouchableOpacity>
                    <View style={styles.drawerItem}>
                        <Icon name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'} color='#aaa' size={30} style={styles.drawerItemIcon} />
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#eee'
    },
    drawerItemIcon: {
        marginRight: 10
    }
})