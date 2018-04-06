import axios from 'axios'

const get = async (api, token) => {
    const response = await axios.get(`/data/${api}`, { headers: { 'Authorization': `Bearer ${token}` } })
    return response.data
}

export default { get }