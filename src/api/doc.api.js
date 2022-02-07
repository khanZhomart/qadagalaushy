import axios from "axios"
import { BASE_URL } from "../config"

class DocApi {

    async create(doc, token) {
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        return await axios.post(
            `${BASE_URL}/api/doc/create`,
            doc,
            header
        )
    }
}

export default new DocApi()