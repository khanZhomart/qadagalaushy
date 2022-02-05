import * as Icon from 'react-bootstrap-icons'

const iconSize = 30

export const items = [
    {
        title: "Домой",
        path: "/home",
        icon: <Icon.HouseFill size={iconSize} />
    },
    {
        title: "Найти дело",
        path: "/case/search",
        icon: <Icon.FolderFill size={iconSize} />
    },
    {
        title: "Внести новое дело",
        path: "/case/create",
        icon: <Icon.FileEarmarkPlusFill size={iconSize} />
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