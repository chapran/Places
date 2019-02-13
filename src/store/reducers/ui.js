import * as types from '../actions/actionTypes'

const initialState = {
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {

        case types.UI_START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case types.UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false
            }

        default:
            return state
    }
}
