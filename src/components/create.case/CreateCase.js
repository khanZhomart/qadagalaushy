import React, { useState } from 'react'
import * as Icon from 'react-bootstrap-icons'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { Modal, Alert,Button, Form, Spinner } from 'react-bootstrap'
import authApi from '../../api/auth.api'
import docApi from '../../api/doc.api'
import { connect } from 'react-redux'

const CreateCase = (props) => {
    const [docId, setDocId] = useState(-1)
    const [username, setUsername] = useState('')
    const [employee, setEmployee] = useState({ userId: '', username: '', firstName: '', lastName: '', patronymic: '' })
    const [agency, setAgency] = useState('')
    const [division, setDivision] = useState('')

    const [delayedEmployeeSearchId, setDelayedEmployeeSearchId] = useState(-1)
    const [employeeLoading, setEmployeeLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const onDocIdChange = (e) => {
        setError('')
        setSuccess(false)
        return setDocId(e.target.value)
    }

    const onAgencyChange = (e) => {
        setError('')
        setSuccess(false)
        return setAgency(e.target.value)
    }

    const onDivisionChange = (e) => {
        setError('')
        setSuccess(false)
        return setDivision(e.target.value)
    }

    const onEmployeeUsernameChange = (e) => {
        setError('')
        setSuccess(false)
        setUsername(e.target.value)

        if (e.target.value !== username)
            clearTimeout(delayedEmployeeSearchId)

        if (e.target.value === '')
            return

        setEmployeeLoading(true)
        const id = setTimeout(async () => {
            try {
                const res = await authApi.loadByUsername(e.target.value, props.token)

                if (!res.data)
                    return setEmployee(undefined)
                console.log(res.data)
                setUsername(res.data.lastName + " " + res.data.firstName + (res.data.patronymic ? " " + res.data.patronymic : ""))
                return setEmployee(res.data)
            } catch (e) {
                if (e.response?.status === 403)
                    return props.logout()

                setError("ERROR_" + e)
            } finally {
                setEmployeeLoading(false)
            }
        }, 1000)

        return setDelayedEmployeeSearchId(id)
    }

    const fieldsFilled = () => {
        return docId !== -1 && employee.userId !== '' && agency !== '' && division !== ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        try {
            await docApi.create(
                {
                    docId,
                    responsibleEmployee: {
                        userId: employee.userId
                    },
                    agency,
                    division
                },
                props.token
            )
            setSuccess(true)
        } catch (e) {
            console.log(e)
        } finally {
            return setLoading(false)
        }
    }

    return (
        <div className="mt-5">
            <p className="text-500 fs-5">Новое дело</p>
            <div className="border rounded-extra bg-white p-3">
                <Form 
                    style={{width: "300px"}} 
                    onSubmit={handleSubmit}
                >
                    {error === '' ? (
                        <>
                        </>
                    ) : (
                        <FadeIn>
                            <Alert
                                className="rounded-extra label-input"
                                variant="danger"
                            >
                            {error}
                            </Alert>
                        </FadeIn>
                    )}
                    {success ? (
                        <FadeIn>
                            <Alert
                                className="rounded-extra label-input"
                                variant="success"
                            >
                                Дело успешно добавлено в базу
                            </Alert>
                        </FadeIn>
                    ) : (
                        <>
                        </>
                    )}
                    <Form.Group className="mb-3">
                        <Form.Label className="label-input">
                            Номер дела
                        </Form.Label>
                        <Form.Control
                            className="rounded-extra"
                            size="sm"
                            type="number"
                            required
                            disabled={loading}
                            onChange={onDocIdChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="label-input">
                            Ответственный сотрудник
                        </Form.Label>
                        {employeeLoading ? (
                            <Spinner 
                                className="mx-2"
                                animation="border"
                                variant="secondary"
                                role="status"
                                size="sm"
                            />
                        ) : (
                            <>
                                {employee?.userId !== '' ? (
                                    <Icon.PatchCheckFill 
                                        className="mx-2"
                                        color="#2da44e"
                                    />
                                ) : (
                                    <>
                                        {employee.userId === '' ? (
                                            <>
                                            </>
                                        ) : (
                                            <Icon.PatchExclamationFill 
                                                className="mx-2"
                                                color="#dc3545"
                                            />
                                        )}
                                    </>
                                )}
                            </>
                        )}
                        <Form.Control
                            className="rounded-extra"
                            value={username}
                            size="sm"
                            type="text"
                            required
                            disabled={loading}
                            onChange={onEmployeeUsernameChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="label-input">
                            Отдел
                        </Form.Label>
                        <Form.Control
                            className="rounded-extra"
                            size="sm"
                            type="text"
                            required
                            disabled={loading}
                            onChange={onAgencyChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="label-input">
                            Подразделение
                        </Form.Label>
                        <Form.Control
                            className="rounded-extra"
                            size="sm"
                            type="text"
                            required
                            disabled={loading}
                            onChange={onDivisionChange}
                        />
                    </Form.Group>
                    
                    <Button
                        className="border rounded-extra w-100 mt-3"
                        variant="primary"
                        size="sm"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner 
                                    className="mx-2"
                                    animation="border"
                                    role="status"
                                    size="sm"
                                />
                                <span className="text-500">Сохраняем...</span>
                            </>
                        ) : (
                            <span className="text-500">Сохранить</span>
                        )}
                    </Button>
                </Form>
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
)(CreateCase)