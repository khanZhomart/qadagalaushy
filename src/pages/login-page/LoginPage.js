import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import Login from '../../components/login/Login.js'

import './loginpage.css'

const LoginPage = (props) => {
    
    useEffect(() => {
        document.title = "Авторизация"
    })

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