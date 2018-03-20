import React from 'react'

const Reddit = ({ item }) => {
    const thing = item.object

    /*if (thing.data.secure_media_embed.content) {
        console.log('HEP!')
        return thing.data.secure_media_embed.content
    }*/
    
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
    padding: 5
}

export default Reddit