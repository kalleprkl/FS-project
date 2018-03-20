import axios from 'axios'

const get = async (url, auth) => {
    const response = await axios.get(url, { headers: { 'Authorization': auth } })
    return response.data
}

export default { get }