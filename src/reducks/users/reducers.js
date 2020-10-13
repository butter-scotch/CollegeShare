import * as Actions from './actions'
import initialState from '../store/initialState'

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.ADD_ICON:
      return{
        ...state,
        ...action.payload
      }
    case Actions.DELETE_PRODUCT_ACTION:
      return{
        ...state,
        products: [...action.payload]
      }
    case Actions.DELETE_SELL_ACTION:
      return{
        ...state,
        sells: [...action.payload]
      }
    case Actions.FETCH_ORDERS_HISTORY:
      return{
        ...state,
        orders: [...action.payload]
      }
    case Actions.FETCH_PRODUCTS_IN_FAVORITE:
      return{
        ...state,
        favorite: [...action.payload]
      }
    case Actions.FETCH_SELLS_ACTION:
      return{
        ...state,
        sells: [...action.payload]
      }
    case Actions.SIGN_IN:
      return{
        ...state,
        ...action.payload
      }
    case Actions.SIGN_OUT:
      return{
        ...state,
        ...action.payload
      }
    default: 
      return state
  }
}