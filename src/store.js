import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import apiReducer from './reducers/apiReducer'
import sessionReducer from './reducers/sessionReducer'

const reducer = (combineReducers({
    apis: apiReducer,
    session: sessionReducer
}))

const initStore = () => {
    const store = createStore(
        reducer,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    )
    return store
}

export default initStore