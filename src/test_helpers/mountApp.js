import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import App from '../App'

export const mountApp = async (store) => {
    const wrapper = mount(<Provider store={store}><App /></Provider>)
    await asyncFlush()
    return wrapper
}

export const asyncFlush = () => new Promise(resolve => setTimeout(resolve, 0)) 
