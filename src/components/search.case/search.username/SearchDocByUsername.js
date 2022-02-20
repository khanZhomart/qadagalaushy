import React, { useState, useEffect } from 'react'
import { Form, Button, Spinner, Accordion, FormControl } from 'react-bootstrap'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import docApi from '../../../api/doc.api'

const SearchDocByUsername = (props) => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [doc, setDoc] = useState([])

    const onDocUsernameChange = (e) => {
        setError('')
        setUsername(e.target.value)
    }

    const onSubmitSearchByUsername = () => {
        setLoading(true)
        
        docApi.getAllByUsername(username, props.token)
            .then((res) => {
                console.log(res.data)
                if (res.data === '') {
                    setTimeout(() => {
                        setError('Документ отсутствует в базе')
                        setLoading(false)
                    }, 1000)
                } else {
                    console.log('bruh')
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

                if (e.response.status === 403)
                    return props.logout()

                console.log(e)
            })
    }

    useEffect(() => {

    }, [error, success])

    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>Короткое имя сотрудника</Form.Label>
                <FormControl
                    type="text"
                    onChange={onDocUsernameChange}
                    disabled={loading}
                />
                {loading ? (
                    <Button onClick={onSubmitSearchByUsername} className='mt-2' style={{width: '100px'}} disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    </Button>
                ) : (
                    <Button onClick={onSubmitSearchByUsername} className='mt-2' style={{width: '100px'}}>
                        <span><b>Найти</b></span>
                    </Button>
                )}
            </Form.Group>

            {success ? (
                <FadeIn>
                    <div className='mt-5 w-50'>
                        <Accordion>
                            {doc.map((item, key) => {
                                return <Accordion.Item eventKey={key}>
                                    <Accordion.Header>
                                        Дело №{item.docId}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {item.agency} {item.division} {item.assignmentDate}
                                    </Accordion.Body>
                                </Accordion.Item>
                            })}
                        </Accordion>
                    </div>
                </FadeIn>
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
)(SearchDocByUsername)