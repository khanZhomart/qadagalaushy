import * as Icon from 'react-bootstrap-icons'

const iconSize = 20

export const items = [
    {
        title: "Журнал",
        path: "/home",
        icon: <Icon.HouseFill size={iconSize} />
    },
    {
        title: "Найти сотрудника",
        path: "/employee/search",
        icon: <Icon.PersonLinesFill size={iconSize} />
    },
    {
        title: "Добавить сотрудника",
        path: "/employee/create",
        icon: <Icon.PersonPlusFill size={iconSize} />
    }
]