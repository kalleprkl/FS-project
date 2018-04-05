import axios from 'axios'

const get = async (token) => {
    const response = await axios.get('/auth', { headers: { 'Authorization': `Bearer ${token}` } })
    return response.data
}

const logout = async (api, token) => {
    const response = await axios.get(`/auth/logout/${api}`, { headers: { 'Authorization': `Bearer ${token}` } })
    return response.data
}

export default { get, logout }
