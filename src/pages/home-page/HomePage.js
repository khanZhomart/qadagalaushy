import React, { useEffect } from 'react'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { Col, Container, Fade, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import NavigationBar from '../../components/nav/NavigationBar'
import Panel from '../../components/panel/Panel'
import UserCard from '../../components/user.card/UserCard'

import './homepage.css'
import MyCases from '../../components/my.cases/MyCases'
import EmployeesPanel from '../../components/employees.panel/EmployeesPanel'

const HomePage = (props) => {

  useEffect(() => {
    document.title = "Журнал"
  })

  return (
    <>
      <NavigationBar />
      <Container 
        className="px-4 mt-5"
        fluid
      >
        <Row>
          <Col sm md={12} lg={2}>
            <UserCard />
          </Col>
          <Col sm md={12} lg={7}>
            <FadeIn>
              {props.role === 'Руководитель' || props.role === 'Менеджер' || props.role === 'Разработчик' ? (
                <Panel />
              ) : (
                <MyCases />
              )}
            </FadeIn>
          </Col>
          <Col sm md={12} lg={3}>
            <FadeIn>
                {props.role === 'Руководитель' || props.role === 'Разработчик' ? (
                  <EmployeesPanel />
                ) : (
                  <>
                  </>
                )}
            </FadeIn>
          </Col>
        </Row>
      </Container>

      {props.authenticated ? (
        <>
        </>
      ) : (
        <Redirect push to="/login" />
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
      authenticated: state.authReducer.token.authenticated,
      role: state.authReducer.profile.role
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
)(HomePage)