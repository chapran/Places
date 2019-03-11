import { STORE_IMAGE_FUNCTION_URL, API_URL } from '../../../apiConfig'
import * as types from '../../constants/actionTypes'
import { uiStartLoading, uiStopLoading } from './ui'
import { authGetToken } from './auth'

export const addPlace = (placeName, location, image) => {
  return async (dispatch) => {
    try {
      dispatch(uiStartLoading())
      const token = await dispatch(authGetToken())
      const imageUploadRes = await fetch(STORE_IMAGE_FUNCTION_URL, {
        method: 'POST',
        body: JSON.stringify({
          image: image.base64
        }),
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const { imageUrl } = await imageUploadRes.json()

      if(!imageUrl) throw new Error('Image upload failed.')

      const placeData = {
        name: placeName,
        location,
        image: imageUrl
      }

      const addPlaceRes = await fetch(`${API_URL}/places.json?auth=${token}`, {
        method: 'POST',
        body: JSON.stringify(placeData)
      })
      const parsedRes = await addPlaceRes.json()
      if (parsedRes.error) {
        throw parsedRes.error
      }
      dispatch(uiStopLoading())

      // TODO: Add places list updater
    } catch (e) {
      console.log(e);
      alert(e.message)
      dispatch(uiStopLoading())
    }
  }
}

const setPlaces = places => ({
  type: types.SET_PLACES,
  places
})

export const getPlaces = () => {
  return async (dispatch) => {
    try {
      const token = await dispatch(authGetToken())
      const res = await fetch(`${API_URL}/places.json?auth=${token}`)

      const parsedRes = await res.json()
      if (parsedRes.error) {
        throw parsedRes.error
      }
      const places = Object.keys(parsedRes).map(key => ({
        ...parsedRes[key],
        image: {
          uri: parsedRes[key].image
        },
        key
      }))

      dispatch(setPlaces(places))
    } catch (e) {
      console.log(e)
      alert('Sorry, fetching places failed.')
      return Promise.reject()
    }
  }
}

const deletePlace = placeKey => ({
  type: types.DELETE_PLACE, placeKey
})

export const removePlaceFromFirebase = placeKey => {
  return async (dispatch) => {
    dispatch(uiStartLoading())
    try {
      const token = await dispatch(authGetToken())
      await fetch(`${API_URL}/places/${placeKey}.json?auth=${token}`, {
        method: 'DELETE'
      })
      dispatch(deletePlace(placeKey))
      dispatch(uiStopLoading())
    } catch (e) {
      console.log(e)
      alert('Sorry, place deletion failed.')
      dispatch(uiStopLoading())
    }
  }
}
