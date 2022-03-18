import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

import './mainpage.css'
import authApi from '../../api/auth.api'

const MainPage = (props) => {
    
    const isValidToken = async () => {
        try {
            await authApi.verifyToken(props.accessToken)
            return true;
        } catch (e) {
            if (e.response?.status === 403) {
                props.logout()
                return false
            }

            return false;
        }
    }

    return (
        <>
            <div className="position-absolute d-flex align-items-center h-100 w-100">
                <div className="mx-auto">
                    <FadeIn delay={100}>
                        <Spinner
                            style={{width: "50px", height: "50px"}}
                            variant="secondary"
                            animation="border" 
                            role="status"
                            size="lg"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </FadeIn>
                </div>
            </div>

            {isValidToken() ? (
                <Redirect push to="/home" />
            ) : (
                <Redirect push to="/login" />
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authReducer.token.authenticated,
        accessToken: state.authReducer.token.accessToken
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
)(MainPage)