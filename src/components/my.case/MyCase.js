import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Table, Button, Badge } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
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

    const editDocReport = (index, report) => {
        docs[index].report = report
    }

    const editDocLegal = (index, legal) => {
        docs[index].legal = legal
    }

    useEffect(() => {
        setDocsLoading(true)

        docApi.getAllByUsername(props.username, props.token)
            .then((res) => {
                console.log(res.data)
                setTimeout(() => {
                    setDocsLoading(false)
                    setDocs(res.data)
                })
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
                                                            {docs.map((doc) => (
                                                            <tr>
                                                                <td>{doc.docId}</td>
                                                                <td>{doc.responsibleEmployee.lastName + " " + doc.responsibleEmployee.firstName + " " + (doc.responsibleEmployee.patronymic ? doc.responsibleEmployee.patronymic : "")}</td>
                                                                <td>{doc.agency}</td>
                                                                <td>{doc.division}</td>
                                                                <td>{doc.assignmentDate}</td>
                                                                <td>
                                                                    {doc.report ? (
                                                                        <>
                                                                            <span>doc.report</span><br />
                                                                            <Badge onClick={() => setEditingReport(true)} bg="primary" style={{cursor: "pointer"}}>Изменить</Badge>
                                                                        </>
                                                                    ) : (
                                                                        <span style={{color: "red"}}>
                                                                            Неизвестно<br />
                                                                            <Badge onClick={() => setEditingReport(true)} bg="primary" style={{cursor: "pointer"}}>Изменить</Badge>
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {doc.legal ? (
                                                                        <span style={{color: "green"}}>Законно</span>
                                                                    ) : (
                                                                        <span style={{color: "red"}}>
                                                                            Неизвестно<br />
                                                                            <Badge onClick={() => setEditingLegal(true)} bg="primary" style={{cursor: "pointer"}}>Изменить</Badge>
                                                                        </span>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                )}
                                            </div>
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