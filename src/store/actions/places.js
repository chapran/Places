import * as types from './actionTypes'

export const addPlace = (placeName, location) => ({
  type: types.ADD_PLACE,
  placeName, location
})

export const deletePlace = placeKey => ({
  type: types.DELETE_PLACE, placeKey
})
