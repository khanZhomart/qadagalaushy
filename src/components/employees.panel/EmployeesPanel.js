import React, { useEffect, useState } from 'react'
import { Badge, Form, ListGroup, Spinner, Button } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import userApi from '../../api/user.api.js'
import methods from '../../services/user.service/user.search.js'

const EmployeesPanel = (props) => {
    const [employees, setEmployees] = useState([])

    const [searchRequest, setSearchRequest] = useState('')
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState('Без сортировки')
    const [search, setSearch] = useState('Все сотрудники')

    const [delayedRequestId, setDelayedRequestId] = useState(-1)

    const onSearchChange = (e) => {
        if (e.target.value === 'Все сотрудники') {
            setSearchRequest('')
            loadDocs()
        }

        return setSearch(e.target.value)
    }

    const onSearchRequestChange = (e) => {
        setSearchRequest(e.target.value)

        if (search === 'Все сотрудники')
            return

        if (e.target.value !== searchRequest)
            clearTimeout(delayedRequestId)

        if (e.target.value === '')
            return loadDocs()

        setLoading(true)
        const id = setTimeout(async () => {
            try {
                const res = await methods[search].doSearch(e.target.value, props.token)

                if (!res.data)
                    return setEmployees([])

                setEmployees([res.data])
            } catch (e) {
                if (e.response?.status === 403)
                    return props.logout()

                setEmployees([])
            } finally {
                setLoading(false)
            }
        }, 1000)

        return setDelayedRequestId(id)
    }

    const loadDocs = async () => {
        setLoading(true)

        try {
            const res = await userApi.getAll(props.token)
            setEmployees(res.data)
        } catch (e) {
            if (e.response.status === 403)
                return props.logout()
        } finally {
            setLoading(false)
        }
    }

    const getUserFullname = (user, name = '') => {
        name += user.lastName
        name += " " + user.firstName
        name += (user.patronymic ? " " + user.patronymic : "")

        return name
    }

    useEffect(() => {
        (async () => {
            await loadDocs()
        })()
    }, [])

    return (
        <div>
            <p className="text-500 fs-5">Сотрудники</p>
            <div
                className="border rounded-extra bg-white p-3"
            >
                <Form.Group className="mb-3">
                    <Form.Control
                        className="rounded-extra"
                        type="text"
                        size="sm"
                        value={searchRequest}
                        placeholder="Найти сотрудника"
                        disabled={search === 'Все сотрудники'}
                        onChange={onSearchRequestChange}
                    />
                    <div className="mt-2">
                        <Form.Select 
                            style={{width: "150px"}}
                            className="d-inline rounded-extra bg-light"
                            size="sm"
                            disabled={loading}
                            onChange={onSearchChange}
                        >
                            <option value="Все сотрудники">Все сотрудники</option>
                            <option>Поиск по никнейму</option>
                        </Form.Select>
                        <div className="d-inline">
                            <Link to="/employee/create">
                                <Button
                                    className="mx-2 rounded-extra box-success border"
                                    size="sm"
                                >
                                    <div className="d-inline">
                                        <Icon.PersonPlusFill
                                            className="mb-1" 
                                            size="15" 
                                        />
                                    </div>
                                    <span className="text-500 mx-1">Добавить</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-1">
                        <Badge
                            pill
                            bg="secondary"
                        >
                            {search}
                        </Badge>
                    </div>
                </Form.Group>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <Spinner
                            className="mt-4"
                            animation="border"
                            role="status"
                        /> 
                    </div>
                ) : (
                    <>
                        {employees.length === 0 ? (
                            <div className="border-dotted rounded-extra h-100px p-3 text-center">
                                <div className="mt-2">
                                    <span className="text-mted text-700">
                                        Ничего не найдено!
                                    </span>
                                    <span style={{fontSize: "10px"}} className="d-block text-muted">
                                        Убедитесь, что вы ввели правильный запрос.
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div style={{ fontSize: "15px" }} className="mt-3">
                                <ListGroup 
                                    className="rounded-extra"
                                    as="ol" 
                                    numbered
                                >
                                    {employees.map((e, index) => {
                                        return (
                                            <ListGroup.Item
                                                as="li"
                                                className="d-flex justify-content-between align-items-start"
                                            >
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">
                                                        {getUserFullname(e)}
                                                    </div>
                                                    <span className="text-muted">
                                                        @{e.username}
                                                    </span>
                                                </div>
                                                <Badge bg="primary" pill>
                                                    {e.roles[0].name}
                                                </Badge>
                                            </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.authReducer.token.accessToken,
        authenticated: state.authReducer.token.authenticated
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch({
                type: 'SIGNOUT_SUCCESS'
            })
        }
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeesPanel)