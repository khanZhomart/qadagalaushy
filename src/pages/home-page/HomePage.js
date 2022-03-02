import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import NavigationBar from '../../components/nav/NavigationBar'
import Panel from '../../components/panel/Panel'
import UserCard from '../../components/user.card/UserCard'

import './homepage.css'

const HomePage = (props) => {

  useEffect(() => {
    document.title = "Домой"
  })

  return (
    <>
      <NavigationBar />
      <Container 
        className="px-4 mt-5"
        fluid
      >
        <Row>
          <Col sm md={12} lg={3}>
            <UserCard />
          </Col>
          <Col sm md={12} lg={6}>
            <Panel />
          </Col>
          <Col sm md={12} lg={3}>
            <p>3 of 3</p>
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