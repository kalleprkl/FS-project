import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import configureMockStore from 'redux-mock-store'
import store from './store'
import App from './App'

configure({ adapter: new Adapter() })

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
}
global.localStorage = localStorageMock

describe('', () => {
    it('', () => {
        moxios.install()
        const state = {
            session: '',
            apis: []
        }
        //const store = mockStore(state)
        store.dispatch({
            type: 'ADD_SESSION',
            payload: {
                token: 'sdf',
                apis: [
                    { api: 'youtube', autUrl: ''},
                    { api: 'reddit', autUrl: ''}
                ]
            }
        })
        console.log(store.getState())
        //localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({}))
        moxios.stubRequest('/auth', {
            status: 200,
            response: {
                token: '<newToken>',
                apis: [
                    { api: 'youtube', autUrl: 'youtube auth url'},
                    { api: 'reddit', autUrl: 'reddit auth url'}
                ]
            }
        })
        const app = mount(<Provider store={store}><App /></Provider>)
        console.log(store.getState())
        moxios.uninstall()
    })
})