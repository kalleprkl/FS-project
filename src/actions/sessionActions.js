import sessionService from '../services/sessions'
import axios from 'axios'

const toInit = [
    {
        source: 'youtube',
        url: 'http://localhost:5000/yt'
    },
    {
        source: 'reddit',
        url: 'http://localhost:5000/r'
    }
]

export const initSession = () => {
    return async (dispatch) => {
        await Promise.all(toInit.map(async ({ source, url }) => {
            const session = window.localStorage.getItem(`rf-${source}`)
            //console.log(session)
            try {
                const response = await sessionService.get(url, session)
                if (response.session) {
                    //console.log('AAAA')
                    dispatch({
                        type: 'ADD_SESSION',
                        payload: {
                            source,
                            session
                        }
                    })
                } else {
                    //console.log('HOP')
                    window.localStorage.removeItem(`rf-${source}}`)
                    window.localStorage.setItem(`rf-${source}`, response.state)
                    dispatch({
                        type: 'ADD_SESSION',
                        payload: {
                            source,
                            session: response.state,
                            url: response.authUrl
                        }
                    })
                }
            } catch (error) {
                console.log('session init error')
            }
        }))
    }
}

export const endSession = ({ source, session }) => {
    //console.log('ACTION', source)
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:5000/r/logout`, { headers: { 'Authorization': session } })
        } catch (error) {
            console.log('SHIT')
        }
        window.localStorage.removeItem(`rf-${source}}`)
        console.log('HEP')
        dispatch({
            type: 'REMOVE_SESSION',
            payload: source
        })
        dispatch({
            type: 'CONTAINER_DEL',
            payload: source
        })
    }
}





