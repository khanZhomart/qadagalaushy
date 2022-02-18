import React, { useState, useEffect } from 'react'
import { Form, Button, Card, FormControl, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import docApi from '../../../api/doc.api'

const SearchByDocId = (props) => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [docId, setDocId] = useState(-1)
    const [doc, setDoc] = useState({})

    const onDocIdChange = (e) => {
        setError('')
        setDocId(Number(e.target.value))
    }

    const onSubmitSearchByDocId = () => {
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
        <Form.Group className="mb-3">
            <Form.Label>Номер уголовного дела</Form.Label>
            <FormControl
                type="number"
                onChange={onDocIdChange}
                disabled={loading}
            />
            {loading ? (
                <Button onClick={onSubmitSearchByDocId} className='mt-2' style={{width: '100px'}} disabled>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                </Button>
            ) : (
                <Button onClick={onSubmitSearchByDocId} className='mt-2' style={{width: '100px'}}>
                    <span><b>Найти</b></span>
                </Button>
            )}
        </Form.Group>

        {success ? (
            <div className='mt-5 w-50'>
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
)(SearchByDocId)