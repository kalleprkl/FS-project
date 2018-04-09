import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import moxios from 'moxios'
import initStore from './store'

import { mockStore } from './test_helpers/mockStore'
import { getLocalStorageMock } from './test_helpers/localStorageMock'
import { mountApp } from './test_helpers/mountApp'

configure({ adapter: new Adapter() })

const localStorageMock = getLocalStorageMock()

beforeEach(() => {
    moxios.install() 
})

afterEach(() => {
    moxios.uninstall()
})

/* Not really happy with these,
Would need a way to re-render the mounted app to observe true integration */

describe('on initialization, server responses result in a correct state', () => {

    it('no active session for token found in local storage', async () => {
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ token: '<token>' }))
        moxios.stubRequest('/auth', {
            status: 200,
            response: {
                token: '<new_token>',
                apis: [
                    { api: 'youtube', authUrl: '<auth_url>' },
                    { api: "reddit", authUrl: '<auth_url>' }
                ]
            }
        })

        const store = initStore()
        const app = await mountApp(store)
        const expectedState = {
            session: {
                token: '<new_token>',
                apis: [
                    { api: 'youtube', authUrl: '<auth_url>' },
                    { api: 'reddit', authUrl: '<auth_url>' }
                ]
            },
            apis: []
        }
        expect(store.getState()).toEqual(expectedState)
    })

    it('active session for youtube for found token', async () => {
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ token: '<token>' }))
        moxios.stubRequest('/auth', {
            status: 200,
            response: {
                apis: [
                    { api: 'youtube', authUrl: '' },
                    { api: "reddit", authUrl: '<auth_url>' }
                ]
            }
        })
        moxios.stubRequest('/data/youtube', {
            status: 200,
            response: ['1234']
        })
        const store = initStore()
        const app = await mountApp(store)
        const expectedState = {
            session: {
                token: '<token>',
                apis: [
                    { api: 'youtube', authUrl: '' },
                    { api: 'reddit', authUrl: '<auth_url>' }
                ]
            },
            apis: [
                {
                    api: 'youtube',
                    items: [{ id: expect.any(String), api: 'youtube', object: '1234' }]
                }
            ]
        }
        expect(store.getState()).toEqual(expectedState)
    })

    it('active session for reddit for found token', async () => {
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ token: '<token>' }))
        moxios.stubRequest('/auth', {
            status: 200,
            response: {
                apis: [
                    { api: 'youtube', authUrl: '<auth_url>' },
                    { api: "reddit", authUrl: '' }
                ]
            }
        })
        moxios.stubRequest('/data/reddit', {
            status: 200,
            response: [
                { data: { title: 'a funny post' } }
            ]
        })
        const store = initStore()
        const app = await mountApp(store)
        const expectedState = {
            session: {
                token: '<token>',
                apis: [
                    { api: 'youtube', authUrl: '<auth_url>' },
                    { api: 'reddit', authUrl: '' }
                ]
            },
            apis: [
                {
                    api: 'reddit',
                    items: [
                        {
                            id: expect.any(String),
                            api: 'reddit',
                            object: {
                                data: {
                                    title: 'a funny post'
                                }
                            }
                        }
                    ]
                }
            ]
        }
        expect(store.getState()).toEqual(expectedState)
    })

    it('active for both', async () => {
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ token: '<token>' }))
        moxios.stubRequest('/auth', {
            status: 200,
            response: {
                apis: [
                    { api: 'youtube', authUrl: '' },
                    { api: "reddit", authUrl: '' }
                ]
            }
        })
        moxios.stubRequest('/data/youtube', {
            status: 200,
            response: ['1234']
        })
        moxios.stubRequest('/data/reddit', {
            status: 200,
            response: [
                { data: { title: 'a funny post' } }
            ]
        })
        const store = initStore()
        const app = await mountApp(store)
        const expectedState = {
            session: {
                token: '<token>',
                apis: [
                    { api: 'youtube', authUrl: '' },
                    { api: 'reddit', authUrl: '' }
                ]
            },
            apis: [
                {
                    api: 'youtube',
                    items: [{ id: expect.any(String), api: 'youtube', object: '1234' }]
                },
                {
                    api: 'reddit',
                    items: [
                        {
                            id: expect.any(String),
                            api: 'reddit',
                            object: {
                                data: {
                                    title: 'a funny post'
                                }
                            }
                        }
                    ]
                }
            ]
        }
        expect(store.getState()).toEqual(expectedState)
    })
})

describe('a view corresponding to the state is rendered', () => {

    it('', async () => {
        const state = {
            session: {
                apis: [
                    { api: 'youtube', authUrl: '<youtube_auth_url>' },
                    { api: 'reddit', authUrl: '<reddit_auth_url>' }
                ]
            },
            apis: []
        }
        const store = mockStore(state)
        const app = await mountApp(store)
        expect(app.find({ href: '<youtube_auth_url>' }).at(0).text()).toBe('youtube')
        expect(app.find({ href: '<reddit_auth_url>' }).at(0).text()).toBe('reddit')
        expect(app.find('Feed').text()).toBe('give permissions to fill feed')
    })

    it('', async () => {
        const state = {
            session: {
                apis: [
                    { api: 'youtube', authUrl: '' },
                    { api: 'reddit', authUrl: '<reddit_auth_url>' }
                ]
            },
            apis: [
                { api: 'youtube', items: [{ id: '1', api: 'youtube', object: 'video_id' }] }
            ]
        }
        const store = mockStore(state)
        const app = await mountApp(store)
        expect(app.find('MenuItem').at(0).text()).toBe('youtube logout')
        expect(app.find({ href: '<reddit_auth_url>' }).at(0).text()).toBe('reddit')
        expect(app.find('Feed').text()).toBe('video_id')
    })

    it('', async () => {
        const state = {
            session: {
                apis: [
                    { api: 'youtube', authUrl: '' },
                    { api: 'reddit', authUrl: '' }
                ]
            },
            apis: [
                { api: 'youtube', items: [{ id: '1', api: 'youtube', object: 'video_id' }] },
                { api: 'reddit', items: [{ id: '2', api: 'reddit', object: { data: { title: 'post title' } } }] }
            ]
        }
        const store = mockStore(state)
        const app = await mountApp(store)
        expect(app.find('MenuItem').at(0).text()).toBe('youtube logout')
        expect(app.find('MenuItem').at(1).text()).toBe('reddit logout')
        expect(app.find('FeedEvent').at(0).text()).toBe('video_id')
        expect(app.find('FeedEvent').at(1).text()).toBe('post title')
    })
})