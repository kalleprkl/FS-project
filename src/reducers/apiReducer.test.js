import reducer from './apiReducer'

describe('apiReducer', () => {

    it('initial state', () => {
        expect(reducer(undefined, {})).toEqual([])
    })

    it('ADD_API', () => {
        const oldState = []
        const type = 'ADD_API'
        const api = 'reddit'
        const items = ['...items']
        const payload = { api, items }
        const newState = reducer(oldState, { type, payload })
        expect(newState).toEqual([{ api: 'reddit', items: ['...items'] }])
    })

    it('REMOVE_API', () => {
        const oldState = [{ api: 'reddit', items: ['...items'] }]
        const type = 'REMOVE_API'
        const api = 'reddit'
        const payload = api
        const newState = reducer(oldState, { type, payload })
        expect(newState).toEqual([])
    })
})

