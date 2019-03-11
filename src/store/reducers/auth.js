import * as types from '../../constants/actionTypes'

const initialState = {
  token: null,
  expiryDate: null
}

export default (state = initialState, action) => {
  switch (action.type) {

    case types.AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
        expiryDate: action.expiryDate
      }

    case types.AUTH_SIGN_OUT:
      return initialState

    default:
      return state
  }
}
