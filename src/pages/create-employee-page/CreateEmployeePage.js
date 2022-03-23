import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import BackButton from '../../components/back-button/BackButton'
import CreateEmployee from '../../components/create.employee/CreateEmployee'
import NavigationBar from '../../components/nav/NavigationBar'

const CreateEmployeePage = (props) => {
    return (
        <>
            <NavigationBar />
            <div className="d-flex justify-content-center">
                <FadeIn>
                    <div>
                        <Container>
                            <Row>
                                <Col>
                                    <BackButton link="/home" />
                                </Col>
                                <Col>
                                    <CreateEmployee />
                                </Col>
                            </Row>
                        </Container>
                    </div>
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
)(CreateEmployeePage)