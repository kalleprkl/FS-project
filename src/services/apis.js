import axios from 'axios'

const get = async (url, token) => {
    const response = await axios.get(url, { headers: { 'Authorization': token } })
    return response.data
}

export default { get }