import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import authApi from '../../api/auth.api'
import Login from '../../components/login/Login.js'

import './loginpage.css'

const LoginPage = (props) => {
    
    return (
        props.authenticated ? (
            <>
                <Redirect push to="/home" />
            </>
        ) : (
            <>
                <div className="d-flex justify-content-center mt-5">
                    <Login />
                </div>
            </>
        )
    )
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authReducer.token.authenticated
    }
}
  
export default connect(
    mapStateToProps
)(LoginPage)