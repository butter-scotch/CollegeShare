import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import {connectRouter, routerMiddleware} from "connected-react-router"
import thunk from 'redux-thunk'

import {UsersReducer} from "../users/reducers"
import {SchoolsReducer} from "../schools/reducers"


export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      schools: SchoolsReducer,
      users: UsersReducer,
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
}
