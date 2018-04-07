import reducer from './sessionReducer'

describe('sessionReducer', () => {
    
    it('initial state', () => {
        expect(reducer(undefined, {})).toBeFalsy()
    })

    it('SET_SESSION', () => {
        const oldState = {
            token: '<token>',
            apis: ['...apis']
        }
        const newSession = {
            token: '<newToken>',
            apis: ['...apis']
        }
        const newState = reducer(oldState, { type: 'SET_SESSION', payload: newSession })
        expect(newState).toEqual(newSession)
    })
})