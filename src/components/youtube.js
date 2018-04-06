import React from 'react'

const Youtube = ({ item }) => {
    const id = item.object
    const url = `https://www.youtube.com/embed/${id}`
    return (
        <div style={{ margin: 20 }}>
            <iframe
                id= {id}
                title={id}
                position='fixed'
                width="480"
                height="270"
                type="text/html"
                src={url}
                frameBorder="0"
            ></iframe>
        </div>
    )
}

export default Youtube