import React, { useEffect, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import FadeIn from 'react-fade-in'
import { useDispatch, connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import authApi from '../../api/auth.api';

import './login.css'

const Login = (props) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)

  const onUsernameChange = (e) => {
    setError('')
    setUsername(e.target.value)
  }

  const onPasswordChange = (e) => {
    setError('')
    setPassword(e.target.value)
  }

  const onSubmitPress = () => {
    setLoading(true)
    
    authApi.login(username, password)
      .then((authRes) => {
        authApi.loadByUsername(username, authRes.data.accessToken)
          .then((res) => {
            const user = res.data
            console.log(user)
            return dispatch({
              type: 'SIGNIN_SUCCESS',
              payload: {
                  username: user.username,
                  uid: user.userId,
                  profile: {
                    firstname: user.firstName,
                    lastname: user.lastName,
                    patronymic: user.patronymic,
                    role: user.roles[0].name
                  },
                  token: {
                      authenticated: true,
                      accessToken: authRes.data.accessToken,
                      refreshToken: authRes.data.refreshToken,
                  }
              }
            })
          })

          setLoading(false)
      })
      .catch((e) => {
        setTimeout(() => {
          setError('Неправильное имя пользователя или пароль')
          setLoading(false)
        }, 1000)
      })
  }

  useEffect(() => {

  }, [error])

  return (
    <FadeIn>
      {props.authenticated ? (
          <Redirect push to="/home" />
        ) : (
          <div className="login-box d-flex justify-content-center mt-5">
              <Form className="login-form p-5">
                <p>Вход в систему</p>

                <Form.Text style={{display: 'block', color: 'red'}}>
                    {error}   
                </Form.Text>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Имя пользователя</Form.Label>
                  <Form.Control onChange={onUsernameChange} type="text" placeholder="" />
                  <Form.Text className="text-muted">
                    Например @username
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control onChange={onPasswordChange} type="password" placeholder="" />
                </Form.Group>

                {loading ? (
                  <Button className="mt-2" variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </Button>
                ) : (
                  <Button className="mt-2" onClick={onSubmitPress} variant="primary">
                    <b>Отправить</b>
                  </Button>
                )}
              </Form>
          </div>
        )
      }
    </FadeIn>
  )
};

const mapStateToProps = (state) => {
  return {
      authenticated: state.authReducer.token.authenticated
  }
}

export default connect(
  mapStateToProps
)(Login)