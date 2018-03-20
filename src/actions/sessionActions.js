const toInit = [
    'youtube',
    'reddit'
]

export const initSession = () => {
    return (dispatch) => {
        toInit.map(source => {
            const session = window.localStorage.getItem(`rf-${source}`)
            if (session) {
                const payload = {}
                payload[source] = session
                console.log(payload)
                dispatch({
                    type: 'ADD',
                    payload
                })
            }
        })
    }
}