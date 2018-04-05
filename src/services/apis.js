import axios from 'axios'

const get = async (api, token) => {
    const response = await axios.get(`http://localhost:5000/data/${api}`, { headers: { 'Authorization': `Bearer ${token}` } })
    return response.data
}

export default { get }