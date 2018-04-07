import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import ItemContainer from './itemContainer'

configure({ adapter: new Adapter() })

const middlewares = []
const mockStore = configureMockStore(middlewares)

describe('ItemContainer', () => {

    it('handles no session (server down)', () => {
        const state = { session: '', apis: [] }
        const store = mockStore(state)
        const container = mount(<Provider store={store}><ItemContainer /></Provider>)
        expect(container.find('div').text()).toBe('service unavailable')
    })

    it('handles no content', () => {
        const state = { session: {}, apis: [] }
        const store = mockStore(state)
        const container = mount(<Provider store={store}><ItemContainer /></Provider>)
        expect(container.find('div').text()).toBe('give permissions to fill feed')
    })

    it('handles unknown content', () => {
        const state = {
            session: {},
            apis: [
                {
                    api: 'unknown',
                    items: [
                        { something: 'weird' }
                    ]
                }
            ]
        }
        const store = mockStore(state)
        const container = mount(<Provider store={store}><ItemContainer /></Provider>)
        expect(container.find('p').at(0).text()).toBe('unknown')
    })

    it('handles content', () => {
        const state = {
            session: {},
            apis: [
                {
                    api: 'reddit',
                    items: [
                        {
                            id: '1',
                            api: 'reddit',
                            object: {
                                data: {
                                    title: 'a funny post'
                                }
                            }
                        }
                    ]
                },
                {
                    api: 'youtube',
                    items: [
                        {
                            id: '2',
                            api: 'youtube',
                            object: 'a video'
                        }
                    ]
                }
            ]
        }
        const store = mockStore(state)
        const container = mount(<Provider store={store}><ItemContainer /></Provider>)
        expect(container.find('p').length).toBe(2)
        expect(container.find('p').at(0).text()).toBe('a funny post')
        expect(container.find('p').at(1).text()).toBe('a video')
    })
})