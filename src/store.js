import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import itemContainerReducer from './reducers/itemContainerReducer'
import apiReducer from './reducers/apiReducer'
import sessionReducer from './reducers/sessionReducer'

const reducer = (combineReducers({
    itemContainer: itemContainerReducer,
    apis: apiReducer,
    session: sessionReducer
}))

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store