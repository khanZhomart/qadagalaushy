/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import * as Icon from 'react-bootstrap-icons'
import docApi from '../../api/doc.api.js'
import { Button, Form, Badge, Spinner, Table, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

import filters from '../../services/doc.service/doc.filters.js'
import methods from '../../services/doc.service/doc.search.js'
import { Link } from 'react-router-dom'

const Panel = (props) => {
    const [docs, setDocs] = useState([])

    const [searchRequest, setSearchRequest] = useState('')
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState('Без сортировки')
    const [search, setSearch] = useState('Все документы')

    const [delayedRequestId, setDelayedRequestId] = useState(-1)

    const onDeleteClick = async (index, id) => {
        try {
            await docApi.delete(id, props.token)
            loadDocs()
        } catch (e) {
            if (e.response?.status === 500)
                return props.logout()

            console.log(e)
        }
    }
    
    const onFilterChange = (e) => {
        if (e.target.value === 'Без сортировки')
            return setFilter(e.target.value)

        setDocs(filters[e.target.value].doFilter(docs))
        return setFilter(e.target.value)
    }

    const onSearchChange = (e) => {
        if (e.target.value === 'Все документы') {
            setSearchRequest('')
            loadDocs()
        }

        return setSearch(e.target.value)
    }

    const onSearchRequestChange = (e) => {
        setSearchRequest(e.target.value)

        if (search === 'Все документы')
            return

        if (e.target.value !== searchRequest)
            clearTimeout(delayedRequestId)

        if (e.target.value === '')
            return loadDocs()

        setLoading(true)

        const id = setTimeout(async () => {
            try {
                const res = await methods[search].doSearch(e.target.value, props.token)

                if (!res.data[0])
                    return setDocs([])

                setDocs(res.data)
            } catch (e) {
                if (e.response?.status === 403)
                    return props.logout()

                setDocs([])
            } finally {
                setLoading(false)
            }
        }, 1000)

        return setDelayedRequestId(id)
    }

    const loadDocs = async () => {
        setLoading(true)

        try {
            const res = await docApi.getAll(props.token)
            setDocs(res.data)
        } catch (e) {
            if (e.response.status === 403)
                return props.logout()
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        (async () => {
            await loadDocs()
        })()
    }, [])

    return (
        <div style={{ paddingTop: "20px" }}>
            <p className="text-500 fs-5">Журнал</p>
            <div className="border rounded-extra bg-white p-3">
                <Form.Group className="mb-3">
                    <Form.Control 
                        className="rounded-extra"
                        size="sm"
                        value={searchRequest}
                        type={search === 'Поиск по номеру' ? "number" : "text"}
                        placeholder={search === 'Все документы' ? "" : "Введите запрос..."}
                        disabled={search === 'Все документы'}
                        onChange={onSearchRequestChange}
                    />
                    <div className="mt-2">
                        <div className="d-flex flew-row">
                            <Form.Select
                                style={{width: "150px"}}
                                className="d-inline rounded-extra bg-light" 
                                size="sm"
                                disabled={loading}
                                onChange={onSearchChange}
                            >
                                <option value="Все документы">Все документы</option>
                                <option>Поиск по номеру</option>
                                <option>Поиск по сотруднику</option>
                                <option>Поиск по дате</option>
                            </Form.Select>
                            <Form.Select
                                style={{width: "150px"}}
                                className="mx-2 d-inline rounded-extra w-20 bg-light" 
                                size="sm"
                                disabled={loading}
                                onChange={onFilterChange}
                            >
                                <option value="Без сортировки">Без сортировки</option>
                                <option>По номеру</option>
                                <option>По дате</option>
                                <option>По статусу</option>
                            </Form.Select>
                        </div>
                        <div className="mt-2">
                            <div className="d-inline">
                                <Link to="/case/create">
                                    <Button
                                        className="rounded-extra box-success border"
                                        size="sm"
                                    >
                                        <div className="d-inline">
                                            <Icon.FileEarmarkPlusFill
                                                className="mb-1" 
                                                size="15" 
                                            />
                                        </div>
                                        <span className="text-500 mx-1">Новое</span>
                                    </Button>
                                </Link>
                            </div>
                            <div className="d-inline mx-2">
                                <Button
                                    className="rounded-extra box-success border"
                                    size="sm"
                                    onClick={() => loadDocs()}
                                >
                                    <div className="d-inline">
                                        <span className="text-500 mx-1">Обновить</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                        <div className="mt-1">
                            <Badge 
                                pill
                                bg="secondary"
                            >
                                {search}
                            </Badge>{' '}
                            <Badge 
                                pill
                                bg="secondary"
                            >
                                {filter}
                            </Badge>
                        </div>
                    </div>
                </Form.Group>
                {loading ? (
                    <div className="d-flex justify-content-center h-100px">
                        <Spinner
                            className="mt-4"
                            animation="border"
                            role="status" 
                        />
                    </div>
                ) : (
                    <>
                        {docs.length === 0 ? (
                            <div className="border-dotted rounded-extra h-100px p-3 text-center">
                                <div className="mt-2">
                                    <span className="text-muted text-700">
                                        Ничего не найдено!
                                    </span>
                                    <span style={{fontSize: "10px"}} className="d-block text-muted">
                                        Убедитесь, что вы ввели правильный запрос.
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div style={{fontSize: "15px"}} className="border rounded-extra mt-4">
                                <Table
                                    striped
                                    responsive
                                    size="sm"
                                >
                                    <thead>
                                        <tr>
                                            <th>№</th>
                                            <th>Ответственный сотрудник</th>
                                            <th>Орган</th>
                                            <th>Подразделение</th>
                                            <th>Дата назначения</th>
                                            <th>Проделанная работа</th>
                                            <th>Законность ЕРДР</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {docs.map((doc, index) => {
                                            return (
                                                <tr 
                                                    className={doc.legal ? "" : "table-danger"}
                                                    key={index}
                                                >
                                                    <td>
                                                        {doc.docId}<br /> 
                                                        {/* <Badge
                                                            className="cursor-pointer"
                                                            pill
                                                            bg="danger"
                                                            onClick={() => onDeleteClick(index, doc.docId)}
                                                        >
                                                            <Icon.TrashFill />   
                                                        </Badge> */}
                                                    </td>
                                                    <td>{doc.responsibleEmployee.lastName + " " + doc.responsibleEmployee.firstName + " " + (doc.responsibleEmployee.patronymic ? doc.responsibleEmployee.patronymic : "")}</td>
                                                    <td>{doc.agency}</td>
                                                    <td>{doc.division}</td>
                                                    <td>{doc.assignmentDate}</td>
                                                    <td>
                                                        {doc.report ? (
                                                            <>
                                                                <span style={{whiteSpace: "pre-line"}}>{doc.report}</span><br />
                                                            </>
                                                        ) : (
                                                            <span style={{color: "red"}}>
                                                                Неизвестно<br />
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {doc.legal ? (
                                                            <span style={{color: "green"}}>Законно</span>
                                                        ) : (
                                                            <span style={{color: "red"}}>
                                                                Неизвестно<br />
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
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
)(Panel)