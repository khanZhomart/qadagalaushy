import React, { useState } from 'react'
import * as Icon from 'react-bootstrap'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import NavigationBar from '../../components/nav/NavigationBar.js'
import CreateCase from '../../components/create.case/CreateCase'
import UserCard from '../../components/user.card/UserCard'

const CreateCasePage = (props) => {


    return (
        <>
            <NavigationBar />
            {/* <Container 
                className="px-4 mt-5"
                fluid
            >
                <Row>
                    <Col sm md={12} lg={4}>

                    </Col>
                    <Col sm md={12} lg={4}>
                        <FadeIn>
                            <CreateCase />
                        </FadeIn>
                    </Col>
                    <Col sm md={12} lg={4}>
                    </Col>
                </Row>
            </Container> */}
            <div className="d-flex justify-content-center">
                <FadeIn>
                    <CreateCase />
                </FadeIn>
            </div>

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
)(CreateCasePage)