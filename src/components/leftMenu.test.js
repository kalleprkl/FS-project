import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import configureMockStore from 'redux-mock-store'
import LeftMenu from './leftMenu'

configure({ adapter: new Adapter() })

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('LeftMenu', () => {

    it('handles missing session', () => {
        const state = {}
        const store = mockStore(state)
        const menu = mount(<Provider store={store}><LeftMenu /></Provider>)
        expect(menu.find('a').length).toBe(0)
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
        const menu = mount(<Provider store={store}><LeftMenu /></Provider>)
        expect(menu.find('a').length).toBe(2)
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
        const menu = mount(<Provider store={store}><LeftMenu /></Provider>)
        expect(menu.find('a').length).toBe(2)
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
        const menu = mount(<Provider store={store}><LeftMenu /></Provider>)
        expect(menu.find('a').length).toBe(2)
        expect(menu.findWhere(node => node.key() === 'youtube').text()).toBe('youtube logout')
        expect(menu.findWhere(node => node.key() === 'reddit').text()).toBe('reddit logout')
    })
})

describe('connected action: endSession', () => {
    it('dispatches on click', () => {
        const state = {
            session: {
                token: '<token>',
                apis: [
                    { api: 'youtube', authUrl: '' },
                    { api: 'reddit', authUrl: '' }
                ]
            }
        }
        const store = mockStore(state)
        const menu = mount(<Provider store={store}><LeftMenu /></Provider>)
        moxios.stubRequest('/auth/logout/youtube', { status: 200 })
        moxios.stubRequest('/auth/logout/reddit', { status: 200 })
        menu.findWhere(node => node.key() === 'youtube').simulate('click')
        menu.findWhere(node => node.key() === 'reddit').simulate('click')
        const expectedActions = [
            { type: 'REMOVE_API', payload: 'youtube' },
            { type: 'REMOVE_API', payload: 'reddit' }
        ]
        expect(store.getActions()).toEqual(expectedActions)
    })
})