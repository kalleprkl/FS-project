import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import containerReducer from './reducers/containerReducer'
import apiReducer from './reducers/apiReducer'

const reducer = (combineReducers({
    container: containerReducer,
    apis: apiReducer
}))

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store