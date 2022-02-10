import React, { useState, useEffect } from 'react'
import { Form, Button, Spinner, Accordion, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import docApi from '../../../api/doc.api'

const SearchDocByUsername = (props) => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [doc, setDoc] = useState({})

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
                <Form.Label>Короткое имя сотрудника</Form.Label>
                <FormControl
                    type="text"
                    onChange={onDocUsernameChange}
                    disabled={loading}
                />
                {loading ? (
                    <Button onClick={onSubmitSearchByUsername} className='w-25' disabled>
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
                    <div className='mt-5 w-50'>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Accordion Item #1</Accordion.Header>
                                <Accordion.Body>
                                
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Accordion Item #2</Accordion.Header>
                                <Accordion.Body>
                                
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
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