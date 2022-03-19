import React, { useState, useEffect } from 'react'
import FadeIn from 'react-fade-in'
import { Form, Alert, Button, Spinner } from 'react-bootstrap'

import authApi from '../../api/auth.api.js'
import { connect } from 'react-redux'

const CreateEmployee = (props) => {
    const [username, setUsername] = useState('')
    const [name, setName] = useState([])
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [position, setPosition] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const onUsernameChange = (e) => {
        setError('')
        return setUsername(e.target.value)
    }

    const onNameChange = (e) => {
        setError('')
        return setName(e.target.value.split(' '))
    }

    const onPasswordChange = (e) => {
        setError('')
        return setPassword(e.target.value)
    }

    const onRoleChange = (e) => {
        setError('')
        return setRole(e.target.value)
    }

    const onPositionChange = (e) => {
        setError('')
        return setPosition(e.target.value)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        try {
            await authApi.register(
                {
                    username: username,
                    password: password,
                    firstName: name[1],
                    lastName: name[0],
                    patronymic: name[3],
                    roles: [
                        {
                            roleId: role
                        }
                    ]
                }, 
                props.token
            )
            setSuccess(true)
        } catch (e) {
            console.log(e)
            setError('Произошла ошибка!')
        } finally {
            return setLoading(false)
        }
    }

    return (
        <div className="mt-5">
            <p className="text-500 fs-5">Добавить сотрудника</p>
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
                            >
                                Сотрудник успешно сохранен!
                            </Alert>
                        </FadeIn>
                    ) : (
                        <>
                        </>
                    )}
                    <Form.Group className="mb-3">
                        <Form.Label className="label-input">
                            Уникальное имя сотрудника
                        </Form.Label>
                        <Form.Control
                            className="rounded-extra"
                            size="sm"
                            type='text'
                            required
                            disabled={loading}
                            onChange={onUsernameChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="label-input">
                            {"Фамилия, имя и отчество (через пробел)"}
                        </Form.Label>
                        <Form.Control 
                            className="rounded-extra"
                            size="sm"
                            type="text"
                            required
                            disabled={loading}
                            autocomplete="new-password"
                            onChange={onNameChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="label-input">
                            Пароль
                        </Form.Label>
                        <Form.Control
                            className="rounded-extra"
                            size="sm"
                            type='password'
                            required
                            disabled={loading}
                            autocomplete="new-password"
                            onChange={onPasswordChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="label-input">
                            Роль
                        </Form.Label>
                        <Form.Select
                            className="d-inline rounded-extra bg-light" 
                            size="sm"
                            disabled={loading}
                            onChange={onRoleChange}
                        >
                            <option value="Роль не выбрана">Роль не выбрана</option>
                            <option value={1}>Руководитель</option>
                            <option value={2}>Менеджер</option>
                            <option value={3}>Помощник</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="label-input">
                            Укажите должность
                        </Form.Label>
                        <Form.Control
                            className="rounded-extra"
                            size="sm"
                            type='text'
                            required
                            disabled={loading}
                            onChange={onPositionChange}
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
)(CreateEmployee)