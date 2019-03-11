import { AsyncStorage } from 'react-native'
import * as types from '../../constants/actionTypes'
import {
  ASYNC_STORAGE_TOKEN_FIELD,
  ASYNC_STORAGE_TOKEN_EXPIRY_DATE,
  ASYNC_STORAGE_REFRESH_TOKEN
} from '../../constants/app'
import { AUTH_API_KEY } from '../../../apiConfig'
import { uiStartLoading, uiStopLoading } from './index'
import startMainTabs from '../../screens/MainTabs/startMainTabs'
import authClearStorage from '../../utils/authClearStorage'
import startApp from '../../../App'

export const tryAuth = ({ email, password }, authMode) => {
  return async (dispatch) => {
    dispatch(uiStartLoading())
    const authModeIdentifier = authMode === 'login' ? 'verifyPassword' : 'signupNewUser'
    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${authModeIdentifier}?key=${AUTH_API_KEY}`
    const errorMessage = 'Auth failed. Please try again.'
    try {
      const authRes = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email, password,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const parsedRes = await authRes.json()
      if (!parsedRes.idToken) {
        alert(errorMessage)
      } else {
        await dispatch(authStoreToken(parsedRes))
        startMainTabs()
      }
    } catch (e) {
      console.log(e);
      alert(errorMessage)
    } finally {
      dispatch(uiStopLoading())
    }
  }
}

export const authStoreToken = ({ idToken, expiresIn, refreshToken }) => {
  return async (dispatch) => {
    const now = new Date()
    const expiryDate = now.getTime() + expiresIn * 1000
    dispatch(authSetToken(idToken, expiryDate))
    await AsyncStorage.multiSet([
      [ASYNC_STORAGE_TOKEN_FIELD, idToken],
      [ASYNC_STORAGE_TOKEN_EXPIRY_DATE, expiryDate.toString()],
      [ASYNC_STORAGE_REFRESH_TOKEN, refreshToken]
    ])
  }
}

export const authSetToken = (token, expiryDate) => ({
  type: types.AUTH_SET_TOKEN,
  token, expiryDate
})

export const authGetToken = () => {
  return async (dispatch, getState) => {
    const currentState = getState()
    let token = currentState.auth.token
    let expiryDate = currentState.auth.expiryDate
    if (token && new Date(expiryDate) > new Date()) {
      return token
    } else {
      token = await AsyncStorage.getItem(ASYNC_STORAGE_TOKEN_FIELD)
      expiryDate = await AsyncStorage.getItem(ASYNC_STORAGE_TOKEN_EXPIRY_DATE)
      if (new Date(+expiryDate) > Date.now()) {
        dispatch(authSetToken(token, +expiryDate))
        return token
      } else {
        const refreshToken = await AsyncStorage.getItem(ASYNC_STORAGE_REFRESH_TOKEN)
        if (refreshToken !== null) {
          const res = await fetch(`https://securetoken.googleapis.com/v1/token?key=${AUTH_API_KEY}`, {
            method: 'POST',
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          const parsedRes = await res.json()
          dispatch(authStoreToken({
            idToken: parsedRes.id_token,
            expiresIn: parsedRes.expires_in,
            refreshToken: parsedRes.refresh_token
          }))
          return token
        } else {
          authClearStorage()
          return null
        }
      }
    }
  }
}

export const authAutoSignIn = () => {
  return async (dispatch) => {
    const token = await dispatch(authGetToken())
    if (token !== null) {
      startMainTabs()
    }
  }
}

export const authSignOut = () => {
  return async (dispatch) => {
    await authClearStorage()
    dispatch({
      type: types.AUTH_SIGN_OUT
    })
    startApp()
  }
}