import React, { useState } from 'react'
import { connect } from 'react-redux'
import authApi from '../../api/auth.api'
import Login from '../../components/login/Login.js'

import './loginpage.css'

const LoginPage = () => {
    
    return (
        <div className="d-flex justify-content-center mt-5">
            <Login />
        </div>
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