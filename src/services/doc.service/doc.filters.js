import comparators from "./doc.comparators"

const filters = {
    'По номеру': {
        doFilter: (docs) => docs.sort(comparators['id'].compare)
    },
    'По дате': {
        doFilter: (docs) => docs.sort(comparators['date'].compare)
    },
    'По статусу': {
        doFilter: (docs) => docs.sort(comparators['status'].compare) 
    },
}

export default filters