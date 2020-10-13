import * as Actions from './actions'
import initialState from '../store/initialState'

export const SchoolsReducer = (state = initialState.schools, action) => {
  switch (action.type) {
    case Actions.FETCH_PRODUCTS:
      return {
        ...state,
        products: [...action.payload]
      }
    default: 
      return state
  }
}