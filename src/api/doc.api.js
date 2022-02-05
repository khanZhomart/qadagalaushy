import axios from "axios"
import { BASE_URL } from "../config"

class DocApi {

    async create(doc) {
        return await axios.post(
            `${BASE_URL}/api/doc/create`,
            doc
        )
    }
}

export default new DocApi()