import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { connect } from 'react-redux';

import { Button, Col, Card, Container, Row, Spinner, InputGroup, FormControl, Form } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import Sidebar from '../nav/Sidebar';
import docApi from '../../api/doc.api';

import './search.case.css'

const SearchCase = (props) => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [docId, setDocId] = useState(-1)
    const [doc, setDoc] = useState({})

    const onDocIdChange = (e) => {
        setError('')
        setDocId(Number(e.target.value))
    }

    const onSubmit = () => {
        setLoading(true)

        docApi.getById(docId, props.token)
            .then((res) => {
                if (res.data === '') {
                    setTimeout(() => {
                        setError('Документ отсутствует в базе')
                        setLoading(false)
                    }, 1000)
                } else {
                    setTimeout(() => {
                        setError('')
                        setDoc(res.data)
                        setSuccess(true)
                        setLoading(false)
                    }, 1000)
                }
            })
            .catch((e) => {
                setError('Произошла непредвиденная ошибка')
                setLoading(false)
                console.log(e)
            })
    }

    useEffect(() => {

    }, [error, success])

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
                                    <FadeIn>
                                        <div className='mt-5'>
                                            <p className='title'>Найти дело</p>
                                                <div className="w-50 mt-5" style={{height: "800px"}}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Номер уголовного дела</Form.Label>
                                                        <FormControl
                                                            type="number"
                                                            onChange={onDocIdChange}
                                                            disabled={loading}
                                                        />
                                                    </Form.Group>
                                                    {loading ? (
                                                        <Button onClick={onSubmit} className='w-25' disabled>
                                                            <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                            />
                                                        </Button>
                                                    ) : (
                                                        <Button onClick={onSubmit} className='w-25'>
                                                            <span><b>Найти</b></span>
                                                        </Button>
                                                    )}

                                                    {success ? (
                                                        <div className='mt-5'>
                                                            {console.log(doc)}
                                                            <Card>
                                                                <Card.Body>
                                                                    <Card.Title>
                                                                        Дело №{doc.docId}
                                                                    </Card.Title>
                                                                    <div className='mt-4'>
                                                                        <span className="group">
                                                                            <p className='value'>
                                                                                <span className="title-doc">
                                                                                    Ответственное лицо
                                                                                </span>
                                                                                <br />{doc.responsibleEmployee.firstName + " " + doc.responsibleEmployee.lastName + " " + (doc.responsibleEmployee.patronymic ? doc.responsibleEmployee.patronymic : "")}
                                                                            </p>
                                                                        </span>

                                                                        <span className="group">
                                                                            <p className='value'>
                                                                                <span className="title-doc">
                                                                                    Орган
                                                                                </span>
                                                                                <br />{doc.agency}
                                                                            </p>
                                                                        </span>

                                                                        <span className="group">
                                                                            <p className='value'>
                                                                                <span className="title-doc">
                                                                                    Подразделение
                                                                                </span>
                                                                                <br />{doc.division}
                                                                            </p>
                                                                        </span>

                                                                        <span className="group">
                                                                            <p className='value'>
                                                                                <span className="title-doc">
                                                                                    Дата назначения
                                                                                </span>
                                                                                <br />{doc.assignmentDate}
                                                                            </p>
                                                                        </span>

                                                                        <span className="group">
                                                                            <p className='value'>
                                                                                <span className="title-doc">
                                                                                    Проделанная работа
                                                                                </span>
                                                                                <br />{doc.report}
                                                                            </p>
                                                                        </span>

                                                                        <span className="group">
                                                                            <p className='value'>
                                                                                <span className="title-doc">
                                                                                    Законность ЕРДР
                                                                                </span>
                                                                                <br />{doc.legal}
                                                                            </p>
                                                                        </span>
                                                                    </div>
                                                                </Card.Body>
                                                            </Card>
                                                        </div>  
                                                    ): (
                                                        <>
                                                        </>
                                                    )}
                                                </div>
                                        </div>
                                    </FadeIn>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </>
            ) : (
                <>

                </>
            )}
        </>
    )
}

const mapToStateProps = (state) => {
    return {
      authenticated: state.authReducer.token.authenticated,
      token: state.authReducer.token.accessToken,
      profile: state.authReducer.profile
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
)(SearchCase)
