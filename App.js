import { Navigation } from 'react-native-navigation'
import Auth from './src/screens/Auth'
import SharePlace from './src/screens/SharePlace'
import FindPlace from './src/screens/FindPlace'
import { Provider } from 'react-redux'
import configureStore from './src/store/configureStore'
import PlaceDetail from './src/screens/PlaceDetail'
import SideDrawer from './src/screens/SideDrawer'

const store = configureStore()

// Register screens
Navigation.registerComponent('rn_udemy_app.AuthScreen', () => Auth, store, Provider)
Navigation.registerComponent('rn_udemy_app.SharePlace', () => SharePlace, store, Provider)
Navigation.registerComponent('rn_udemy_app.FindPlace', () => FindPlace, store, Provider)
Navigation.registerComponent('rn_udemy_app.PlaceDetail', () => PlaceDetail, store, Provider)
Navigation.registerComponent('rn_udemy_app.SideDrawer', () => SideDrawer, store, Provider)

// Start an app
const startApp = () => Navigation.startSingleScreenApp({
  screen: {
    screen: 'rn_udemy_app.AuthScreen',
    title: 'Login'
  }
})

export default startApp