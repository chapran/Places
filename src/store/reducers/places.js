import * as types from '../../constants/actionTypes'

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_PLACES:
            return {
                ...state,
                places: action.places
            }
        case types.DELETE_PLACE:
            return {
                places: state.places.filter(place => place.key !== action.placeKey)
            }
        default:
            return state
    }
}
