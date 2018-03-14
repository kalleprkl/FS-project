import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import containerReducer from './reducers/containerReducer'
import endpointeEducer from './reducers/endpointReducer'

const reducer = (combineReducers({
    container: containerReducer,
    endpoints: endpointeEducer
}))

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store