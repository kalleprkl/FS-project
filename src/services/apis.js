import axios from 'axios'

const get = async (url) => {
    const response = await axios.get(url)
    console.log(response.data.data.children)
    return response.data.data.children
}

export default { get }