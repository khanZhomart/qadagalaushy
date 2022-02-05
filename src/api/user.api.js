import axios from "axios"
import { BASE_URL } from "../config"

class UserApi {

    async update(user) {
        return await axios.post(
            `${BASE_URL}/api/user/update`,
            user
        )
    }

    async remove(userId) {
        return await axios.post(
            `${BASE_URL}/api/user/remove/${userId}`
        )
    }
}

export default new UserApi()