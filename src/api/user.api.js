import axios from "axios"
import { BASE_URL } from "../config"

class UserApi {

    async update(user, token) {
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        return await axios.post(
            `${BASE_URL}/api/user/update`,
            user,
            header
        )
    }

    async remove(userId, token) {
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        return await axios.post(
            `${BASE_URL}/api/user/remove/${userId}`,
            header
        )
    }

    async getAll(token) {
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        return await axios.get(
            `${BASE_URL}/api/user/`,
            header
        )
    }
}

export default new UserApi()