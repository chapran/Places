import React, { Component } from 'react'
import { SafeAreaView, Text, Dimensions, StyleSheet, TouchableOpacity, View, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { authSignOut } from '../store/actions/auth'

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(authSignOut())
})

const SideDrawer = props => (
    <SafeAreaView style={[styles.container, { width: Dimensions.get('window').width * 0.8 }]}>
        <TouchableOpacity onPress={props.signOut}>
            <View style={styles.drawerItem}>
                <Icon name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'} color='#aaa' size={30} style={styles.drawerItemIcon} />
                <Text>Sign Out</Text>
            </View>
        </TouchableOpacity>
    </SafeAreaView>
)

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

export default connect(null, mapDispatchToProps)(SideDrawer)