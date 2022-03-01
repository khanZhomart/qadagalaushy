import React, { useEffect, useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import FadeIn from 'react-fade-in'
import { useDispatch, connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import authApi from '../../api/auth.api';

import './login.css'

const Login = (props) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUsernameChange = (e) => {
    setError('')
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setError('')
    setPassword(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      setError('')
      setLoading(true)

      const auth = await authApi.login(username, password)
      const user = await authApi.loadByUsername(username, auth.data.accessToken) 
      console.log(user)
      return props.login(user.data, auth.data)
    } catch (e) {
      console.log(e)

      if (e.response?.status < 500)
        return setError('Неправильное имя пользователя или пароль.')

      return setError('Произошла непредвиденная ошибка.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form style={{width: "300px"}}>
      <div>
        <div>
          {/* <img 
            className="d-block mx-auto"
            style={{width: "75px", height: "auto"}}
            src="./prok.png" 
            alt="proc" 
          /> */}
        </div>
        <p className="fs-4 text-center">Войти в систему</p>
      </div>

      {error === '' ? (
        <>
        </>
      ) : (
        <FadeIn>
          <Alert
            className="rounded-extra label-input"
            variant="danger"
          >
          {error}
        </Alert>
        </FadeIn>
      )}

      <div className="border p-3 bg-white rounded-extra mt-3">
        <Form.Group className="mb-3">
          <Form.Label className="label-input">Имя пользователя</Form.Label>
          <Form.Control
            className="rounded-extra"
            type="text"
            size="sm"
            onChange={handleUsernameChange}
            disabled={loading}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="label-input">Пароль</Form.Label>
          <Form.Control 
            className="rounded-extra"
            type="password"
            size="sm"
            onChange={handlePasswordChange}
            disabled={loading}
          />
        </Form.Group>
        <Button
            className="w-100 rounded-extra"
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="px-2 text-500">Вход в аккаунт...</span>
              </>
            ) : (
              <>
                <span className="text-500">Войти</span>
              </>
            )}
          </Button>
      </div>
      <div className="d-flex justify-content-center border-dotted rounded-extra mt-2 p-3">
        <span className="text-center text-muted" style={{fontSize: "12px"}}>Нет аккаунта? <span className="text-700">Обратитесь к руководителю</span></span>
      </div>
    </Form>
  )
}

const mapStateToProps = (state) => {
  return {
      authenticated: state.authReducer.token.authenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      login: (user, auth) => {
          return dispatch({
            type: 'SIGNIN_SUCCESS',
            payload: {
                username: user.username,
                uid: user.userId,
                profile: {
                  firstname: user.firstName,
                  lastname: user.lastName,
                  patronymic: user.patronymic,
                  prosecutor: user.prosecutor,
                  position: user.position,
                  role: user.roles[0].name
                },
                token: {
                    authenticated: true,
                    accessToken: auth.accessToken,
                    refreshToken: auth.refreshToken,
                }
            }
          })
      }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)