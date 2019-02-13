import { STORE_IMAGE_FUNCTION_URL, API_URL } from '../../../apiConfig'
import * as types from './actionTypes'
import { uiStartLoading, uiStopLoading } from './ui'

export const addPlace = (placeName, location, image) => {
  return async (dispatch) => {
    try {
      dispatch(uiStartLoading())
      const imageUploadRes = await fetch(STORE_IMAGE_FUNCTION_URL, {
        method: 'POST',
        body: JSON.stringify({
          image: image.base64
        })
      })
      const { imageUrl } = await imageUploadRes.json()

      const placeData = {
        name: placeName,
        location,
        image: imageUrl
      }

      const addPlaceRes = await fetch(`${API_URL}/places.json`, {
        method: 'POST',
        body: JSON.stringify(placeData)
      })
      await addPlaceRes.json()
      dispatch(uiStopLoading())

    } catch (e) {
      console.log(e);
      alert('Sorry, place upload failed. Please try again.')
      dispatch(uiStopLoading())
    }
  }
}

export const setPlaces = places => ({
  type: types.SET_PLACES,
  places
})

export const getPlaces = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${API_URL}/places.json`)
      
      const parsedRes = await res.json()
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
      throw e
    }
  }
}


export const deletePlace = placeKey => ({
  type: types.DELETE_PLACE, placeKey
})
