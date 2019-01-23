import { Navigation } from 'react-native-navigation'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'ios' ? 'ios-map' : 'md-map', 30),
        Icon.getImageSource(Platform.OS === 'ios' ? 'ios-share' : 'md-share-alt', 30),
        Icon.getImageSource(Platform.OS === 'ios' ? 'ios-menu' : 'md-menu', 30)
    ]).then(sources => {
        const navigatorButtons = {
            leftButtons: [
                {
                    icon: sources[2],
                    title: 'Menu',
                    id: 'sideDrawerToggle'
                }
            ]
        }

        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: 'rn_udemy_app.FindPlace',
                    label: 'Find Place',
                    title: 'Find Place',
                    icon: sources[0],
                    navigatorButtons
                },
                {
                    screen: 'rn_udemy_app.SharePlace',
                    label: 'Share Place',
                    title: 'Share Place',
                    icon: sources[1],
                    navigatorButtons
                },
            ],
            tabsStyle: {
                tabBarSelectedButtonColor: 'orange'
            },
            appStyle: {
                tabBarSelectedButtonColor: 'orange'
            },
            drawer: {
                left: {
                    screen: 'rn_udemy_app.SideDrawer'
                }
            }
        })
    })
}

export default startTabs