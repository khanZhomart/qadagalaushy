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

    async update(doc, token) {
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        return await axios.post(
            `${BASE_URL}/api/doc/update`,
            doc,
            header
        )
    }

    async delete(id, token) {
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        return await axios.post(
            `${BASE_URL}/api/doc/remove/${id}`,
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
            `${BASE_URL}/api/doc/`,
            header
        )
    }

    async getById(docId, token) {
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        return await axios.get(
            `${BASE_URL}/api/doc/${docId}`,
            header
        )
    }

    async getAllByUsername(username, token) {
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        return await axios.get(
            `${BASE_URL}/api/doc/user/${username}`,
            header
        )
    }
}

export default new DocApi()