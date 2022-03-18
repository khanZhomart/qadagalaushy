const comparators = {
    'id': {
        compare: (a, b) => {
            if (a.docId < b.docId)
                return -1

            if (a.docId > b.docId)
                return 1
            
            return 0
        }
    },
    'date': {
        compare: (a, b) => {
            return new Date(b.assignmentDate) - new Date(a.assignmentDate)
        }
    },
    'status': {
        compare: (a, b) => {
            if (b.legal)
                return -1

            if (a.legal)
                return 1

            return 0
        }
    }
}

const getEmployeeName = (employee, name = '') => {
    name += employee.lastName
    name += " " + employee.firstName
    name += (employee.patronymic ? " " + employee.patronymic : "")

    return name
}

export default comparators