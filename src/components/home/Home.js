import React, { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in'
import { FormControl, InputGroup, Dropdown, DropdownButton, Button, Badge, Form, Spinner, Card, Container, OverlayTrigger, Popover, Row, Col, Modal } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

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
            <Col>
              <Sidebar />
            </Col>
            <Col md={9}>
              <div style={{paddingLeft: "50px"}}>
                <div className="mt-5">
                  <FadeIn>
                    <p className="title">Карточка пользователя</p>
                    <div className="bg-round bg-primary user-card d-flex flew-row" style={{width: (props.profile.patronymic ? "475px" : "375px")}}>
                      <div className="mt-2">
                        <Icon.PersonBadge size="40" color="white"/>
                      </div>
                      <div className="" style={{marginLeft: "10px"}}>
                        <div className="d-flex flex-column">
                          <span className="person-name">
                            {props.profile.lastname + " " + props.profile.firstname + " " + (props.profile.patronymic ? props.profile.patronymic : "")}
                          </span>
                          <div>
                            <span className='role-name'>
                              <Badge bg="light" text="dark">{props.profile.role}</Badge>
                              <div className="d-inline px-1"></div>
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
            {/* <Col>
              <Container className='mt-5'>
              
                <Container style={{width: "500px"}}>
                  <Row xs="auto" className="bg-primary bg-round p-3">
                    <Col className="mt-2">
                      <Icon.PersonBadge size="35" color='white'/>
                    </Col>
                    <Col>
                      <span className="person-name">
                        {props.profile.lastname + " " + props.profile.firstname + " " + (props.profile.patronymic ? props.profile.patronymic : "")}
                      </span>
                      <span className='d-block role-name'>
                        <Badge bg="light" text="dark">Менеджер</Badge>
                        <div className="d-inline px-1"></div>
                        <Badge bg="light" text="dark">Разработчик</Badge>
                        <div className="d-inline px-1"></div>
                      </span>
                    </Col>
                  </Row>
                </Container>
              </Container>
            </Col> */}
          </Row>
        </Container>

        {/* <FadeIn delay={400}>
          <div className="d-flex justify-content-center menu-box">
            <div className="menu ">
              <p className="title-label">Панель управления</p>
              <br />
              <Container>
                <Row>
                  <Col>
                    <Link to="/search">
                      <Card text="light" className="border-0 rounded-3" style={{width: "18rem", backgroundColor: "#F05454"}}>
                        <Card.Body>
                          <Card.Title className="action-title" style={{fontSize: "30px"}}>
                            Найти дело
                          </Card.Title>
                            <Icon.Search className="ico" />
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/create">    
                      <Card text="light" className="border-0 rounded-3" style={{width: "18rem", backgroundColor: "#8A39E1"}}>
                        <Card.Body>
                          <Card.Title className="action-title" style={{fontSize: "30px"}}>
                            Внести новое <br/> дело
                          </Card.Title>
                            <Icon.FileEarmarkPlus className="ico" />
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                </Row>
              </Container>
              <Container className="mt-4">
                <Row>
                  <Col>
                      <Card onClick={handleShow} bg="primary" text="light" className="border-0 rounded-3" style={{width: "18rem", cursor: "pointer"}}>
                        <Card.Body>
                          <Card.Title className="action-title" style={{fontSize: "30px"}}>
                            Добавить сотрудника
                          </Card.Title>
                            <Icon.PersonPlusFill className="ico" />
                        </Card.Body>
                      </Card>
                    </Col>
                </Row>
              </Container>
            </div>
          </div> */}
          </>
      ) : (
        <>
        <div className="d-flex justify-content-center mt-5">
            <img src="./prok.png" alt="img" />
            <p className="title d-inline">Qadagalaushy</p>
        </div>

        <FadeIn>
          <div className="d-flex justify-content-center mt-5">
              <div className="box border round p-3">
                <p>{console.log(props.profile)}</p>
                <p className="subtitle mx-auto mt-3">Выберите действие</p>
                <div className="px-4 btns">
                    <div className="w-100">
                      <Link to="/login">
                        <Button>
                          Войти в систему
                        </Button>
                      </Link>
                    </div>
                    <div className="w-100 mt-3">
                      <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                        <Button variant="secondary">
                          У меня нет аккаунта
                        </Button>
                      </OverlayTrigger>
                    </div>
                </div>
              </div>
          </div>
        </FadeIn>
        </>
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