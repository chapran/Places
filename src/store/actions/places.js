import * as types from './actionTypes'

export const addPlace = (placeName, location, image) => ({
  type: types.ADD_PLACE,
  placeName, location, image
})

export const deletePlace = placeKey => ({
  type: types.DELETE_PLACE, placeKey
})
