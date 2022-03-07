import React, { useEffect } from 'react'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { Col, Container, Fade, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import NavigationBar from '../../components/nav/NavigationBar'
import Panel from '../../components/panel/Panel'
import UserCard from '../../components/user.card/UserCard'

import './homepage.css'

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
              <Panel />
            </FadeIn>
          </Col>
          <Col sm md={12} lg={3}>
            <FadeIn>
              <div>
                <p className="text-500 fs-5">Untitled</p>
                <div
                  style={{height: "300px"}} 
                  className="border rounded-extra bg-white p-3"
                >
                  *content*
                </div>
              </div>
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
)(HomePage)