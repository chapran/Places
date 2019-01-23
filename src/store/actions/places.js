import * as types from './actionTypes'

export const addPlace = placeName => ({
  type: types.ADD_PLACE,
  placeName
})

export const deletePlace = placeKey => ({
  type: types.DELETE_PLACE, placeKey
})
