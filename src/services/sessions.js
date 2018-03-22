import axios from 'axios'

const get = async (url, token) => {
    const response = await axios.get(url, { headers: { 'Authorization': token } })
    return response.data
}

const logout = async (source, token) => {
    let path
    if (source === 'reddit') {
        path = 'r'
    }
    if (source === 'youtube') {
        path = 'yt'
    }
    const response = await axios.get(`http://localhost:5000/${path}/logout`, { headers: { 'Authorization': token } })
    return response.data
}

export default { get, logout }
