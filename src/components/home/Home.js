import React, { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in'
import { FormControl, InputGroup, Dropdown, DropdownButton, Button, Badge, Form, Spinner, Card, Container, OverlayTrigger, Popover, Row, Col, Modal } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';

import './home.css'
import authApi from '../../api/auth.api';
import Sidebar from '../nav/Sidebar';

const Home = (props) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [role, setRole] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const filled = () => {
    return username !== '' && password !== '' && confirmPassword !== ''
      && firstname !== '' && lastname !== '' && role !== ''
  }

  const onUsernameChange = (e) => setUsername(e.target.value)

  const onPasswordChange = (e) => setPassword(e.target.value)
  const onPasswordConfirmationChange = (e) => setConfirmPassword(e.target.value)

  const onFirstnameChange = (e) => setFirstname(e.target.value)
  const onLastnameChange = (e) => setLastname(e.target.value)
  const onPatronymicChange = (e) => setPatronymic(e.target.value)

  const onRoleSelect = (e) => setRole('')

  const onSubmit = () => {
    setLoading(true)

    authApi.register({
      username: username,
      password: password,
      firstName: firstname,
      lastName: lastname,
      patronymic: patronymic,
      role: [{
          roleId: role
      }]
    })
    .then((res) => {
      setTimeout(() => {
        setLoading(false)
        handleClose()
      }, 1000)
    })
    .catch((res) => {
      setTimeout(() => {
        setLoading(false)
        setError('Произошла ошибка')
      }, 1000)
    })
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Как мне получить доступ?</Popover.Header>
      <Popover.Body>
        Обратитесь к руководителю, чтобы он вас зарегистрировал в системе.
      </Popover.Body>
    </Popover>
  );

  useEffect(() => {

  }, [error])

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
                    <p className="title">Карточка пользователя</p>
                    <div className="bg-round bg-primary user-card d-flex flew-row" style={{width: (props.profile.patronymic ? `450px` : "375px")}}>
                      <div className="mt-2">
                        <Icon.PersonBadge size="40" color="white"/>
                      </div>
                      <div className="" style={{marginLeft: "10px"}}>
                        <div className="d-flex flex-column">
                          <span className="person-name" style={{lineHeight: '1.2'}}>
                            {props.profile.lastname + " " + props.profile.firstname + " " + (props.profile.patronymic ? props.profile.patronymic : "")}
                          </span>
                          <div className='mt-2'>
                            <span className='role-name'>
                              <Badge bg="light" text="dark">{props.profile.role}</Badge>
                              <div className="d-inline ps-1"></div>
                              <Badge bg="light" text="dark">{props.profile.prosecutor}</Badge>
                              <div className="px-1"></div>
                              <Badge bg="light" text="dark">{props.profile.position}</Badge>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                  <div className="space-block">
                    <p className="title">Журнал дел</p>
                    <div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
    </>
      ) : (
        <Redirect push to="/" />        
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
)(Home)