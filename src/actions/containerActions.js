
export const addToContainer = (item) => {
    return (dispatch) => {
        dispatch({
            type: 'CONTAINER_ADD',
            payload: item
        })
    }
}

export const removeFromContainer = (item) => {
    return (dispatch) => {
        dispatch({
            type: 'CONTAINER_DEL',
            payload: item
        })
    }
}



