import React from 'react'

const Reddit = ({ item }) => {
    const thing = item.object

    return (
        <div style={border} >
            <p>{thing.data.title}</p>
        </div>
    )
}

const border = {
    border: 'solid',
    borderWidth: '1px',
    maxWidth: 500,
    textAlign: 'left',
    //fontSize: 'small',
    margin: 10,
    padding: 5,
}

export default Reddit