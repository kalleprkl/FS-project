import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import { initSession, endSession } from './sessionActions'

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
}
global.localStorage = localStorageMock

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore()

beforeEach(() => {
    moxios.install()
})

afterEach(() => {
    moxios.uninstall()
    store.clearActions()
})

describe('initSession', () => {

    const store = mockStore()

    afterEach(() => {
        store.clearActions()
    })

    it('uses token found in storage if such exists', async () => {
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ token: '<token>' }))
        moxios.stubRequest('/auth', {
            status: 200,
            response: { apis: ['...apis'] }
        })
        await store.dispatch(initSession())
        const expectedActions = [
            {
                type: 'SET_SESSION',
                payload: { token: '<token>', apis: ['...apis'] }
            }
        ]
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('token received in response takes precedense over the one found in storage', async () => {
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ token: '<token>' }))
        moxios.stubRequest('/auth', {
            status: 200,
            response: { token: '<newToken>', apis: ['...apis'] }
        })
        await store.dispatch(initSession())
        const expectedActions = [
            {
                type: 'SET_SESSION',
                payload: { token: '<newToken>', apis: ['...apis'] }
            }
        ]
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('if there is no token in storage, the one in response is used', async () => {
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(''))
        moxios.stubRequest('/auth', {
            status: 200,
            response: { token: '<newToken>', apis: ['...apis'] }
        })
        await store.dispatch(initSession())
        const expectedActions = [
            {
                type: 'SET_SESSION',
                payload: { token: '<newToken>', apis: ['...apis'] }
            }
        ]
        expect(store.getActions()).toEqual(expectedActions)
    })
})

describe('endSession', () => {

    it('', async () => {
        const store = mockStore({
            session: { token : '<token>' }
        })
        moxios.stubRequest('/auth/logout/reddit', {
            status: 200,
            response: { apis: ['...apis'] }
        })
        await store.dispatch(endSession('reddit'))
        const expected = [
            {
                type: 'REMOVE_API',
                payload: 'reddit'
            },
            {
                type: 'SET_SESSION',
                payload: { token: '<token>', apis: ['...apis'] }
            }
        ]
        expect(store.getActions()).toEqual(expected)
    })

    it('token in response gets precedence', async () => {
        const store = mockStore({
            session: { token : '<token>' }
        })
        moxios.stubRequest('/auth/logout/reddit', {
            status: 200,
            response: { token: '<newToken>', apis: ['...apis'] }
        })
        await store.dispatch(endSession('reddit'))
        const expectedActions = [
            {
                type: 'REMOVE_API',
                payload: 'reddit'
            },
            {
                type: 'SET_SESSION',
                payload: { token: '<newToken>', apis: ['...apis'] }
            }
        ]
        expect(store.getActions()).toEqual(expectedActions)
    })
})