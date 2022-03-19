import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as Icon from 'react-bootstrap-icons'
import { Modal, FormLabel, Form, Button, Badge, Table, Spinner } from 'react-bootstrap'

import docApi from '../../api/doc.api.js'
import filters from '../../services/doc.service/doc.filters.js'

const MyCases = (props) => {
    const [docs, setDocs] = useState([])

    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState('Без сортировки')

    const [editingReport, setEditingReport] = useState(false)
    const [editingLegal, setEditingLegal] = useState(false)

    const [reportEdited, setReportEdited] = useState('')
    const [legalEdited, setLegalEdited] = useState(false)
    const [targetDoc, setTargetDoc] = useState('')

    const editDocReport = () => {
        setEditingReport(false)
        docs[targetDoc].report = reportEdited
        docApi.update(docs[targetDoc], props.token)
    }

    const editDocLegal = () => {
        console.log(targetDoc)
        setEditingLegal(false)
        docs[targetDoc].legal = legalEdited
        docApi.update(docs[targetDoc], props.token)
    }

    const onFilterChange = (e) => {
        if (e.target.value === 'Без сортировки')
            return setFilter(e.target.value)
        
        setDocs(filters[e.target.value].doFilter(docs))
        return setFilter(e.target.value)
    }

    const loadDocs = async () => {
        setLoading(true)

        try {
            const res = await docApi.getAllByUsername(props.username, props.token)
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
        <div>
            <p className="text-500 fs-5">Мои дела</p>
            <div className="border rounded-extra bg-white p-3">
                <Form.Group className="mb-3">
                    <div className="mt-2">
                        <Form.Select
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
                        <div className="d-inline mx-2">
                            <Button
                                className="rounded-extra box-success border"
                                size="sm"
                                onClick={() => loadDocs()}
                            >
                                <div className="d-inline">
                                    <Icon.BootstrapReboot
                                        className=""
                                        size="15" 
                                    />
                                </div>
                            </Button>
                        </div>
                        <div className="mt-1">
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
                            <div style={{fontSize: "15px"}} className="mt-4">
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
                                                        {doc.docId}
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
                                                                <Badge
                                                                    onClick={() => {
                                                                        setTargetDoc(index)
                                                                        setEditingReport(true)
                                                                    }} 
                                                                    bg="primary" 
                                                                    style={{cursor: "pointer"}}
                                                                >
                                                                    Изменить
                                                                </Badge>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {doc.legal ? (
                                                            <span style={{color: "green"}}>Законно</span>
                                                        ) : (
                                                            <span style={{color: "red"}}>
                                                                Неизвестно<br />
                                                                <Badge 
                                                                    onClick={() => {
                                                                        setTargetDoc(index)
                                                                        setEditingLegal(true)
                                                                    }} 
                                                                    bg="primary" 
                                                                    style={{cursor: "pointer"}}
                                                                >
                                                                    Изменить
                                                                </Badge>
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

            <Modal show={editingReport} onHide={() => setEditingReport(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Изменить</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form.Group>
                                                        <FormLabel>Проделанная работа</FormLabel>
                                                        <Form.Control onChange={(e) => {
                                                                setReportEdited(e.target.value)
                                                            }} 
                                                            className="rounded-extra"
                                                            as="textarea" 
                                                            rows={3} 
                                                            aria-label="With textarea" 
                                                        />
                                                    </Form.Group>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button 
                                                        className="border rounded-extra"
                                                        variant="secondary" 
                                                        size="sm"
                                                        onClick={() => setEditingReport(false)}
                                                    >
                                                        Отменить
                                                    </Button>
                                                    <Button
                                                        className="border rounded-extra"
                                                        variant="primary" 
                                                        size="sm"
                                                        onClick={() => editDocReport()}
                                                    >
                                                        Подтвердить
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>

                                            <Modal show={editingLegal} onHide={() => setEditingLegal(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Изменить</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form.Group>
                                                        <FormLabel>Законность ЕРДР</FormLabel>
                                                        <Form.Check 
                                                            onChange={() => setLegalEdited(true)}
                                                            type="switch"
                                                            id="custom-switch"
                                                            label="Подтверждаю законность ЕРДР"
                                                        />
                                                        <Form.Text className="text-muted">
                                                            Этот параметр можно изменить только один раз.
                                                        </Form.Text>
                                                    </Form.Group>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button 
                                                        className="border rounded-extra"
                                                        variant="secondary"
                                                        size="sm" 
                                                        onClick={() => setEditingLegal(false)}
                                                    >
                                                        Отменить
                                                    </Button>
                                                    <Button 
                                                        className="border rounded-extra"
                                                        variant="primary" 
                                                        size="sm"
                                                        onClick={() => {
                                                            if (legalEdited)
                                                                editDocLegal()
                                                        }}
                                                    >
                                                        Подтвердить
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.authReducer.token.accessToken,
        username: state.authReducer.username,
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
)(MyCases)