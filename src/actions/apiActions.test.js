import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import { initApis } from './apiActions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('initApis', () => {

    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    }) 

    it('', async () => {
        const store = mockStore({
            session: {
                token: '<token>',
                apis: [
                    { api: 'youtube' },
                    { api: 'reddit' }
                ]
            },
            apis: []
        })
        const expected = [
            {
                type: 'ADD_API',
                payload: {
                    api: 'youtube',
                    items: [{ api: 'youtube', id: expect.stringContaining(''), object: "youtube" }]
                }
            },
            { 
                type: 'ADD_API', 
                payload: { 
                    api: 'reddit', 
                    items: [{ api: 'reddit', id: expect.stringContaining(''), object: 'reddit' }] 
                } 
            }
        ]
        moxios.stubRequest('http://localhost:5000/data/youtube', {
            status: 200,
            response: ['youtube']
        })
        moxios.stubRequest('http://localhost:5000/data/reddit', {
            status: 200,
            response: ['reddit']
        })
        await store.dispatch(initApis())
        expect(store.getActions()).toEqual(expected)
    })
})