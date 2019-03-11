import { AsyncStorage } from 'react-native'
import { 
    ASYNC_STORAGE_TOKEN_FIELD, 
    ASYNC_STORAGE_TOKEN_EXPIRY_DATE,
    ASYNC_STORAGE_REFRESH_TOKEN
 } from '../constants/app'

const authClearStorage = async () => {
    await AsyncStorage.multiRemove([
        ASYNC_STORAGE_TOKEN_FIELD,
        ASYNC_STORAGE_TOKEN_EXPIRY_DATE,
        ASYNC_STORAGE_REFRESH_TOKEN
    ])
}

export default authClearStorage