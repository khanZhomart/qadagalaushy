import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons'
import FadeIn from 'react-fade-in'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import authApi from '../../api/auth.api';
import docApi from '../../api/doc.api';
import Sidebar from '../nav/Sidebar';

import './create.case.css'

const CreateCase = (props) => {
    const [error, setError] = useState('')
    const [searchError, setSearchError] = useState('')
    const [searchLoading, setSearchLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)

    const [caseId, setCaseId] = useState(-1)
    const [responsibleEmployeeName, setResponsibleEmployeeName] = useState('')
    const [responsibleEmployeeId, setResponsibleEmployeeId] = useState(0)
    const [employee, setEmployee] = useState({ firstName: '', lastName: '', patronymic: undefined })
    const [agency, setAgency] = useState('')
    const [division, setDivision] = useState('')
    const [assignmentDate, setAssignmentDate] = useState('')

    const filled = () => {
        return caseId !== '' && responsibleEmployeeName !== '' && agency !== '' &&
            division !== ''
    }

    const onCaseIdChange = (e) => {
        setError('')
        setCaseId(e.target.value)
    }

    const onResponsibleEmployeeNameChange = (e) => {
        setError('')
        setSearchError('')
        setResponsibleEmployeeName(e.target.value)
    }

    const onSearchClick = () => {
        setSearchLoading(true)

        authApi.loadByUsername(responsibleEmployeeName, props.token)
            .then((res) => {
                if (res.data === '') {
                    setTimeout(() => {
                        setSearchError('Сотрудник отсутствует в базе')
                        setResponsibleEmployeeId(0)
                        setResponsibleEmployeeName('')
                        setSearchLoading(false)
                    }, 1000)
                } else {
                    setTimeout(() => {
                        setResponsibleEmployeeId(res.data.userId)
                        setEmployee({
                            firstName: res.data.firstName,
                            lastName: res.data.lastName,
                            patronymic: res.data.patronymic
                        })
    
                        setSearchLoading(false)
                    }, 1000)
                }
            })
            .catch((e) => {
                setTimeout(() => {
                    setSearchError('Сотрудник отсутствует в базе')
                    setResponsibleEmployeeName('')
                    setResponsibleEmployeeId('')
                }, 1000)
            })
    }

    const onAgencyChange = (e) => {
        setError('')
        setAgency(e.target.value)
    }

    const onDivisionChange = (e) => {
        setError('')
        setDivision(e.target.value)
    }

    const onReportChange = (e) => {
        setError('')
        setReport(e.target.value)
    }

    const onSubmit = () => {
        if (!filled())
            return setError("Заполните все поля.")

        setAssignmentDate(new Date().toLocaleDateString().replace(/\./g, '-'))

        setLoading(true)

        docApi.create({
            docId: caseId,
            responsibleEmployee: {
                userId: responsibleEmployeeId
            },
            agency: agency,
            division: division,
            assignmentDate: assignmentDate,
            report: null,
            legal: null
        }, props.token)
        .then((res) => {
            setTimeout(() => {
                setLoading(false)
                setSuccess("Готово! Документ зарегистрирован.")
            }, 1000)
        })
        .catch((e) => {
            setTimeout(() => {
                setLoading(false)

                if (e.response.status === 403)
                    return props.logout()

                setError('Произошла ошибка')
            }, 1000)
        })
    }

    useEffect(() => {

    }, [error, success, responsibleEmployeeId])

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
                                        <div className="mt-5">
                                            <p className="title">Внести новое дело</p>
                                            {success ? 
                                                <div className='mt-5'>
                                                    <FadeIn>
                                                        <div className="mt-5 w-50">
                                                            <div className='mx-auto d-flex justify-content-center mb-2'>
                                                                <Icon.CheckCircleFill size="50" color="#5cb85c"/>
                                                            </div>
                                                            <p className="bold text-center" style={{color: "#5cb85c"}}>
                                                                Готово!<br /><span style={{fontSize: "20px"}}>Дело успешно добавлено.</span>
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

                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Номер уголовного дела</Form.Label>
                                                        <Form.Control onChange={onCaseIdChange} autocomplete="new-password" placeholder="" />
                                                    </Form.Group>

                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Короткое имя ответственного сотрудника</Form.Label>
                                                        {responsibleEmployeeId !== 0 ? (
                                                                    <Icon.CheckCircleFill size="20" color="#5cb85c" className="d-inline" style={{marginLeft: "10px"}}/>
                                                                ) : (
                                                                    <>
                                                                    </>
                                                                )}
                                                        {searchLoading ?
                                                            <>
                                                                <Form.Control onChange={onResponsibleEmployeeNameChange} autocomplete="new-password" placeholder="" disabled/>
                                                                <div className="" style={{width: "100px", marginTop: "10px"}}>
                                                                    <Button variant="primary" className="">
                                                                        <Spinner
                                                                            as="span"
                                                                            animation="border"
                                                                            size="sm"
                                                                            role="status"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </Button>
                                                                </div>
                                                            </>
                                                        :
                                                            <>
                                                                <Form.Text style={{display: 'block', color: 'red'}}>
                                                                    {searchError}   
                                                                </Form.Text>
                                                                <Form.Control onChange={onResponsibleEmployeeNameChange} autocomplete="new-password" placeholder={employee.firstName + " " + employee.lastName + (employee.patronymic ? " " + employee.patronymic : "")} />
                                                                <div className="" style={{width: "100px", marginTop: "10px"}}>
                                                                    <Button onClick={onSearchClick} variant="primary" className="">Найти</Button>
                                                                </div>
                                                                <Form.Text className="text-muted">
                                                                    Не перепутайте с именем: короткое имя сотрудника начинается с @. Он нужен для быстрого поиска по базе.
                                                                </Form.Text>
                                                            </>
                                                        }
                                                    </Form.Group>

                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Орган</Form.Label>
                                                        <Form.Control onChange={onAgencyChange} autocomplete="new-password" placeholder="" />
                                                    </Form.Group>

                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Подразделение</Form.Label>
                                                        <Form.Control onChange={onDivisionChange} autocomplete="new-password" placeholder="" />
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
                <>
                    <Redirect push to="/login" />
                </>
            )}
        </>
    )
};

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
)(CreateCase)
