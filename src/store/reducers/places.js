import * as types from '../actions/actionTypes'

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_PLACE:
            return {
                ...state,
                places: [...state.places, {
                    name: action.placeName,
                    key: Math.random().toString(),
                    image: {
                        uri: action.image.uri
                    },
                    location: action.location
                }]
            }
        case types.DELETE_PLACE:
            return {
                places: state.places.filter(place => place.key !== action.placeKey)
            }
        default:
            return state
    }
}
