import docApi from "../../api/doc.api"

const methods = {
    'Поиск по номеру': {
        doSearch: async (id, token) => await docApi.getById(id, token)
    },
    'Поиск по сотруднику': {
        doSearch: async (id, token) => console.info('[dev]')
    },
    'По дате': {
        doSearch: async (id, token) => console.info('[dev]')
    }
}

export default methods