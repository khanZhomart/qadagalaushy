import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons'
import FadeIn from 'react-fade-in/lib/FadeIn';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from '../nav/Sidebar';

import './create.employee.css'
import '../home/home.css'
import authApi from '../../api/auth.api';

const CreateEmployee = (props) => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [role, setRole] = useState('')

    const filled = () => {
        return username !== '' && firstname !== '' && lastname !== ''
            && password !== '' && confirmPassword !== '' && role !== ''
    }

    const onUsernameChange = (e) => {
        setError("")
        setUsername(e.target.value)
    }

    const onPasswordChange = (e) => {
        setError("")
        setPassword(e.target.value)
    }

    const onPasswordConfirmationChange = (e) => {
        setError("")
        setConfirmPassword(e.target.value)
    }

    const onFirstnameChange = (e) => {
        setError("")
        setFirstname(e.target.value)
    }

    const onLastnameChange = (e) => {
        setError("")
        setLastname(e.target.value)
    }

    const onPatronymicChange = (e) => {
        setError("")
        setPatronymic(e.target.value)
    }

    const onRoleSelect = (e) => {
        setError("")
        setRole(e.target.value)
    }

    const onSubmit = () => {
        if (!filled())
            return setError("Заполните все поля.")

        setLoading(true)
        
        authApi.register({
            username: username,
            password: password,
            firstName: firstname,
            lastName: lastname,
            patronymic: patronymic,
            roles: [
                {
                    roleId: role
                }
        ]
        })
        .then((res) => {
            setTimeout(() => {
                setLoading(false)
                setSuccess("Готово! Сотрудник зарегистрирован.")
            }, 1000)
        })
        .catch((res) => {
            setTimeout(() => {
                setLoading(false)
                setError('Произошла ошибка')
            }, 1000)
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
                            <Col>
                                <Sidebar />
                            </Col>
                            <Col md={9}>
                                <div style={{paddingLeft: "50px"}}>
                                    <FadeIn>
                                        <div className="mt-5">
                                            <p className="title">Добавить сотрудника</p>
                                            {success ?
                                                <div className='mt-5'>
                                                    <FadeIn>
                                                        <div className="mt-5 w-50">
                                                            <div className='mx-auto d-flex justify-content-center mb-2'>
                                                                <Icon.CheckCircleFill size="50" color="#5cb85c"/>
                                                            </div>
                                                            <p className="bold text-center" style={{color: "#5cb85c"}}>
                                                                Готово!<br /><span style={{fontSize: "20px"}}>Сотрудник успешно зарегистрирован.</span>
                                                            </p>
                                                            <div className='mx-auto d-flex justify-content-center mb-2'>
                                                                <Button className="w-50" onClick={() => setSuccess(null)} variant="primary">
                                                                    <b>Добавить ещё</b>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </FadeIn>
                                                </div>
                                            :
                                                <div className="w-50 mt-5" style={{height: "800px"}}>
                                                    <Form>
                                                        <Form.Text style={{display: 'block', color: 'red'}}>
                                                            {error}   
                                                        </Form.Text>
                                                        <Form.Text style={{display: 'block', color: 'green'}}>
                                                            {success}  
                                                        </Form.Text>
                                                            <Form.Group className="mb-3">
                                                            <Form.Label>Имя пользователя</Form.Label>
                                                            <Form.Control onChange={onUsernameChange} autocomplete="new-password" placeholder="" />
                                                            <Form.Text className="text-muted">
                                                                Короткое имя пользователя, по которому найти <br/> сотрудника будет проще.
                                                            </Form.Text>
                                                        </Form.Group>

                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Фамилия, имя и отчество</Form.Label>
                                                            <Form.Control onChange={onLastnameChange} autocomplete="new-password" placeholder="Фамилия" />
                                                            <Form.Control onChange={onFirstnameChange} className="mt-2" autocomplete="new-password" placeholder="Имя" />
                                                            <Form.Control onChange={onPatronymicChange} className="mt-2" autocomplete="new-password" placeholder="Отчество" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Пароль</Form.Label>
                                                            <Form.Control onChange={onPasswordChange} autocomplete="new-password" type="password" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Подтвердите пароль</Form.Label>
                                                            <Form.Control onChange={onPasswordConfirmationChange} autocomplete="new-password" type="password" />
                                                        </Form.Group>
                                                        
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Укажите роль сотрудника</Form.Label>
                                                            <Form.Select onChange={onRoleSelect} aria-label="Default select example">
                                                                <option>Роль не выбрана</option>
                                                                <option value={1}>Руководитель</option>
                                                                <option value={2}>Менеджер</option>
                                                                <option value={3}>Помощник</option>
                                                            </Form.Select>
                                                        </Form.Group>

                                                        {loading ?
                                                            <Button className="mt-2" variant="primary" disabled>
                                                                <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                                />
                                                            </Button>
                                                            :
                                                            <Button variant="primary" onClick={onSubmit}>
                                                                Сохранить
                                                            </Button>
                                                        }
                                                    </Form>
                                                </div>
                                            }
                                        </div>
                                    </FadeIn>
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
};

const mapToStateProps = (state) => {
    return {
      authenticated: state.authReducer.token.authenticated,
      profile: state.authReducer.profile
    }
  }
  
export default connect(
    mapToStateProps,
)(CreateEmployee)
