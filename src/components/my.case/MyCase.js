import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Modal, Table, Button, Badge, FormLabel } from 'react-bootstrap'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import docApi from '../../api/doc.api'
import Sidebar from '../nav/Sidebar'

import './mycase.css'

const MyCase = (props) => {
    const [docsLoading, setDocsLoading] = useState(false)
    const [docs, setDocs] = useState([])

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

    useEffect(() => {
        setDocsLoading(true)

        docApi.getAllByUsername(props.username, props.token)
            .then((res) => {
                setTimeout(() => {
                    setDocsLoading(false)
                    setDocs(res.data)
                })
            })
            .catch((e) => {
                if (e.response.status === 403)
                    return props.logout()
            })
    }, [])

    return (
        <>
            {props.authenticated ? (
                <>
                    <Container fluid>
                        <Row>
                            <Col md={3} lg={3}>
                                <Sidebar />
                            </Col>
                            <Col md={9} lg={9}>
                                <div style={{paddingLeft: "50px"}}>
                                    <div className="mt-5">
                                        <FadeIn>
                                            <p className="title">Мои дела</p>
                                            <div className='mt-5'>
                                                {docs.length === 0 ? (
                                                    <p>empty~</p>
                                                ) : (
                                                    <Table striped bordered hover>
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
                                                            {docs.map((doc, index) => (
                                                            <tr key={doc.docId}>
                                                                <td>{doc.docId}</td>
                                                                <td>{doc.responsibleEmployee.lastName + " " + doc.responsibleEmployee.firstName + " " + (doc.responsibleEmployee.patronymic ? doc.responsibleEmployee.patronymic : "")}</td>
                                                                <td>{doc.agency}</td>
                                                                <td>{doc.division}</td>
                                                                <td>{doc.assignmentDate}</td>
                                                                <td>
                                                                    {doc.report ? (
                                                                        <>
                                                                            <span style={{whiteSpace: "pre-line"}}>{doc.report}</span><br />
                                                                            <Badge onClick={() => {
                                                                                    setTargetDoc(index)
                                                                                    setEditingReport(true)
                                                                                }} bg="primary" style={{cursor: "pointer"}}>
                                                                                Изменить
                                                                            </Badge>
                                                                        </>
                                                                    ) : (
                                                                        <span style={{color: "red"}}>
                                                                            Неизвестно<br />
                                                                            <Badge onClick={() => {
                                                                                    setTargetDoc(index)
                                                                                    setEditingReport(true)
                                                                                }} bg="primary" style={{cursor: "pointer"}}>
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
                                                                            <Badge onClick={() => {
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
                                                            ))}
                                                        </tbody>
                                                    </Table>
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
                                                            as="textarea" 
                                                            rows={3} 
                                                            aria-label="With textarea" 
                                                        />
                                                    </Form.Group>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={() => setEditingReport(false)}>
                                                        Отменить
                                                    </Button>
                                                    <Button variant="primary" onClick={() => editDocReport()}>
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
                                                    <Button variant="secondary" onClick={() => setEditingLegal(false)}>
                                                        Отменить
                                                    </Button>
                                                    <Button variant="primary" onClick={() => {
                                                        if (legalEdited)
                                                            editDocLegal()
                                                    }}>
                                                        Подтвердить
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </FadeIn>
                                    </div>                                    
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </>
            ) : (
                <Redirect push to="/login" />
            )}
        </>
    )
}

const mapToStateProps = (state) => {
    return {
        authenticated: state.authReducer.token.authenticated,
        token: state.authReducer.token.accessToken,
        profile: state.authReducer.profile,
        username: state.authReducer.username
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
    mapToStateProps,
    mapDispatchToProps
)(MyCase)