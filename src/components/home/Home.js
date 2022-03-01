import React, { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in'
import { FormControl, InputGroup, Dropdown, DropdownButton, Button, Table, Badge, Form, Spinner, Card, Container, OverlayTrigger, Popover, Row, Col, Modal } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';

import './home.css'
import authApi from '../../api/auth.api';
import Sidebar from '../nav/Sidebar';
import docApi from '../../api/doc.api';

const Home = (props) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [docs, setDocs] = useState([])

  const loadDocs = () => {
    setLoading(true)

    docApi.getAll(props.token)
      .then((res) => {
        setTimeout(() => {
          setDocs(res.data)
          setLoading(false)
        }, 1000)
      })
      .catch((e) => {
        setTimeout(() => {
          setLoading(false)

          if (e.response.status === 403)
            return props.logout()
        }, 1000)
      })
  }

  useEffect(() => {

  }, [error, loading])

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
                      {loading ? (
                        <>
                          <div className="d-flex flex-row mt-5"> 
                            <Spinner
                              as="span"
                              animation="border"
                              size="md"
                              role="status"
                              aria-hidden="true"
                            />
                            <p style={{marginLeft: "10px", fontSize: "20px", color: "gray"}}>Загрузка...</p>
                          </div>
                        </>
                      ) : (
                        docs.length === 0 ?
                          <div onClick={loadDocs} className="d-flex flex-row mt-5" style={{cursor: "pointer"}}>
                            <Icon.ArrowClockwise size="30" color="gray"/>
                            <p style={{marginLeft: "10px", fontSize: "20px", color: "gray"}}>Загрузить журнал</p>
                          </div>
                        :
                          <div className="mt-5" style={{height: "700px"}}>
                            <div onClick={loadDocs} className="mb-3" style={{cursor: "pointer"}}>
                              <Icon.ArrowClockwise size="25" />
                            </div>
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>№</th>
                                  <th>Ответственный сотрудник</th>
                                  <th>Орган</th>
                                  <th>Подразделение</th>
                                  <th>Дата назначения</th>
                                  <th>Проделанная работа</th>
                                  <th>Законность ЕРДР</th>
                                </tr>
                              </thead>
                              <tbody>
                                {docs.map((doc) => (
                                  <tr>
                                    {console.log(doc)}
                                    <td>{doc.docId}</td>
                                    <td>{doc.responsibleEmployee.lastName + " " + doc.responsibleEmployee.firstName + " " + (doc.responsibleEmployee.patronymic ? doc.responsibleEmployee.patronymic : "")}</td>
                                    <td>{doc.agency}</td>
                                    <td>{doc.division}</td>
                                    <td>{doc.assignmentDate}</td>
                                    <td>
                                        {doc.report ? (
                                            <>
                                                <span style={{whiteSpace: "pre-line"}}>{doc.report}</span><br />
                                            </>
                                        ) : (
                                            <span style={{color: "red"}}>
                                                Неизвестно<br />
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {doc.legal ? (
                                            <span style={{color: "green"}}>Законно</span>
                                        ) : (
                                            <span style={{color: "red"}}>
                                                Неизвестно<br />
                                            </span>
                                        )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
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
)(Home)