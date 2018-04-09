import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import moxios from 'moxios'
import initStore from './store'
import { getLocalStorageMock } from './test_helpers/localStorageMock'
import { mountApp, asyncFlush } from './test_helpers/mountApp'

configure({ adapter: new Adapter() })

const localStorageMock = getLocalStorageMock()

beforeEach(() => {
    moxios.install()
})

afterEach(() => {
    moxios.uninstall()
})

//This really needs refactoring

describe('on initialization, server responses result in a correct state and view', () => {

    it('no active session for token found in local storage', async () => {
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ token: '<token>' }))
        moxios.stubRequest('/auth', {
            status: 200,
            response: {
                token: '<new_token>',
                apis: [
                    { api: 'youtube', authUrl: '<youtube_auth_url>' },
                    { api: "reddit", authUrl: '<reddit_auth_url>' }
                ]
            }
        })

        const store = initStore()
        const app = await mountApp(store)
        app.update()
        const expectedState = {
            session: {
                token: '<new_token>',
                apis: [
                    { api: 'youtube', authUrl: '<youtube_auth_url>' },
                    { api: 'reddit', authUrl: '<reddit_auth_url>' }
                ]
            },
            apis: []
        }
        expect(store.getState()).toEqual(expectedState)
        expect(app.find({ href: '<youtube_auth_url>' }).at(0).text()).toBe('youtube')
        expect(app.find({ href: '<reddit_auth_url>' }).at(0).text()).toBe('reddit')
        expect(app.find('Feed').text()).toBe('give permissions to fill feed')
    })

    it('active session for youtube for found token', async () => {
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ token: '<token>' }))
        moxios.stubRequest('/auth', {
            status: 200,
            response: {
                apis: [
                    { api: 'youtube', authUrl: '' },
                    { api: "reddit", authUrl: '<reddit_auth_url>' }
                ]
            }
        })
        moxios.stubRequest('/data/youtube', {
            status: 200,
            response: ['1234']
        })
        const store = initStore()
        const app = await mountApp(store)
        app.update()
        const expectedState = {
            session: {
                token: '<token>',
                apis: [
                    { api: 'youtube', authUrl: '' },
                    { api: 'reddit', authUrl: '<reddit_auth_url>' }
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
        expect(app.find({ href: '<reddit_auth_url>' }).at(0).text()).toBe('reddit')
        expect(app.find('MenuItem').at(0).text()).toBe('youtube logout')
        expect(app.find('Feed').text()).toBe('1234')
    })

    it('active session for reddit for found token', async () => {
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ token: '<token>' }))
        moxios.stubRequest('/auth', {
            status: 200,
            response: {
                apis: [
                    { api: 'youtube', authUrl: '<youtube_auth_url>' },
                    { api: "reddit", authUrl: '' }
                ]
            }
        })
        moxios.stubRequest('/data/reddit', {
            status: 200,
            response: [
                { data: { title: 'post title' } }
            ]
        })
        const store = initStore()
        const app = await mountApp(store)
        app.update()
        const expectedState = {
            session: {
                token: '<token>',
                apis: [
                    { api: 'youtube', authUrl: '<youtube_auth_url>' },
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
                                    title: 'post title'
                                }
                            }
                        }
                    ]
                }
            ]
        }
        expect(store.getState()).toEqual(expectedState)
        expect(app.find({ href: '<youtube_auth_url>' }).at(0).text()).toBe('youtube')
        expect(app.find('MenuItem').at(1).text()).toBe('reddit logout')
        expect(app.find('Feed').text()).toBe('post title')
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
                { data: { title: 'post title' } }
            ]
        })
        const store = initStore()
        const app = await mountApp(store)
        app.update()
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
                                    title: 'post title'
                                }
                            }
                        }
                    ]
                }
            ]
        }
        expect(store.getState()).toEqual(expectedState)
        expect(app.find('MenuItem').at(0).text()).toBe('youtube logout')
        expect(app.find('MenuItem').at(1).text()).toBe('reddit logout')
        expect(app.find('FeedEvent').at(0).text()).toBe('1234')
        expect(app.find('FeedEvent').at(1).text()).toBe('post title')
    })
})

describe('logout', () => {
    
    it('logs out', async () => {
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
                { data: { title: 'post title' } }
            ]
        })
        const store = initStore()
        const app = await mountApp(store)
        app.update()
        const before = {
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
                                    title: 'post title'
                                }
                            }
                        }
                    ]
                }
            ]
        }
        expect(store.getState()).toEqual(before)
        moxios.stubRequest('/auth/logout/youtube', {
            status: 200,
            response: {
                apis: [
                    { api: 'youtube', authUrl: '<youtube_auth_url>' },
                    { api: "reddit", authUrl: '' }
                ]
            }
        })
        app.find('MenuItem').at(0).simulate('click')
        await asyncFlush()
        app.update()
        const after = {
            session: {
                token: '<token>',
                apis: [
                    { api: 'youtube', authUrl: '<youtube_auth_url>' },
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
                                    title: 'post title'
                                }
                            }
                        }
                    ]
                }
            ]
        }
        expect(store.getState()).toEqual(after)
        expect(app.find({ href: '<youtube_auth_url>' }).at(0).text()).toBe('youtube')
        expect(app.find('MenuItem').at(1).text()).toBe('reddit logout')
        expect(app.find('Feed').text()).toBe('post title')
    })
})

