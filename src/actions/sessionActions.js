import sessionService from '../services/sessions'

export const initSession = () => {
    return async (dispatch) => {
        const foundSession = JSON.parse(window.sessionStorage.getItem(`rf-session`))
        let foundToken = ''
        if (foundSession) {
            foundToken = foundSession.token
        }
        try {
            const response = await sessionService.get('http://localhost:5000/auth', foundToken)
            const session = {
                token: response.token || foundToken,
                apis: response.apis
            }
            window.sessionStorage.setItem(`rf-session`, JSON.stringify(session))
            dispatch({
                type: 'ADD_SESSION',
                payload: session
            })
        } catch (error) {
            console.log('session init failure')
        }
    }
}

export const endSession = ({ api, token }) => {
    return async (dispatch) => {
        window.sessionStorage.removeItem(`rf-session`)
        dispatch({
            type: 'REMOVE_SESSION',
            payload: api
        })
        dispatch({
            type: 'CONTAINER_DEL',
            payload: api
        })
        try {
            const response = await sessionService.logout(api, token)
            /*const newToken = response.token
            window.sessionStorage.setItem(`rf-${api}`, newToken)
            dispatch({
                type: 'ADD_SESSION',
                payload: {
                    api,
                    token: newToken,
                    authUrl: response.authUrl
                }
            })*/
        } catch (error) {
            console.log('logout error')
        }

    }
}





