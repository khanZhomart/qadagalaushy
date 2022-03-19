import authApi from "../../api/auth.api.js"

const methods = {
    'Поиск по никнейму': {
        doSearch: async (username, token) => await authApi.loadByUsername(username, token)
    },
    'Поиск по имени': {
        doSearch: async (id, token) => console.info('[dev]')
    },
    'Поиск по должности': {
        doSearch: async (id, token) => console.info('[dev]')
    }
}

export default methods