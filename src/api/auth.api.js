import axios from "axios"
import { BASE_URL } from "../config"

class AuthApi {

    async login(username, password) {
        const headers = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }

        return await axios.post(
            `${BASE_URL}/api/user/login?username=${username}&password=${password}`,
            headers
        )
    }

    async register(user) {
        return await axios.post(
            `${BASE_URL}/api/user/register`,
            user
        )
    }

    async loadByUsername(username, token) {
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        return await axios.get(
            `${BASE_URL}/api/user/username/${username}`,
            header
        )
    }
}

export default new AuthApi()