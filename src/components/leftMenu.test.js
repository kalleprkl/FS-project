import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import LeftMenu from './leftMenu'

configure({ adapter: new Adapter() })

const middlewares = []
const mockStore = configureMockStore(middlewares)

describe('LeftMenu', () => {

    it('handles missing session', () => {
        const state = {}
        const store = mockStore(state)
        const menu = mount(<Provider store={store}><LeftMenu/></Provider>)
        expect(menu.text()).toBe('loading')
    })
    
    it('handles both logged out', () => {
        const state = {
            session: {
                apis: [
                    { api: 'youtube', authUrl: 'youtubeUrl' },
                    { api: 'reddit', authUrl: 'redditUrl' }
                ]
            }
        }
        const store = mockStore(state)
        const menu = mount(<Provider store={store}><LeftMenu/></Provider>)
        expect(menu.find({ href: 'youtubeUrl' }).at(0).text()).toBe('youtube')
        expect(menu.find({ href: 'redditUrl' }).at(0).text()).toBe('reddit')
    })

    it('handles logged out and logged in', () => {
        const state = {
            session: {
                apis: [
                    { api: 'youtube', authUrl: 'youtubeUrl' },
                    { api: 'reddit', authUrl: '' }
                ]
            }
        }
        const store = mockStore(state)
        const menu = mount(<Provider store={store}><LeftMenu/></Provider>)
        expect(menu.find({ href: 'youtubeUrl' }).at(0).text()).toBe('youtube')
        expect(menu.find('a').at(1).text()).toBe('reddit logout')
    })

    it('handles all logged in', () => {
        const state = {
            session: {
                apis: [
                    { api: 'youtube', authUrl: '' },
                    { api: 'reddit', authUrl: '' }
                ]
            }
        }
        const store = mockStore(state)
        const menu = mount(<Provider store={store}><LeftMenu/></Provider>)
        expect(menu.find('a').at(0).text()).toBe('youtube logout')
        expect(menu.find('a').at(1).text()).toBe('reddit logout')
    })
})