import React, { useState } from 'react'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';

const Main = (props) => {
    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Как мне получить доступ?</Popover.Header>
          <Popover.Body>
            Обратитесь к руководителю, чтобы он вас зарегистрировал в системе.
          </Popover.Body>
        </Popover>
      );

    return (
        <>
            {props.authenticated ? (
                <Redirect push to="/home" />
            ) : ( 
                <FadeIn>
                    <div className="d-flex justify-content-center mt-5">
                        <div className="box border round p-3">
                            <p className="subtitle mx-auto mt-3">Выберите действие</p>
                            <div className="px-4 btns">
                                <div className="w-100">
                                <Link to="/login">
                                    <Button>
                                    Войти в систему
                                    </Button>
                                </Link>
                                </div>
                                <div className="w-100 mt-3">
                                <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                                    <Button variant="secondary">
                                    У меня нет аккаунта
                                    </Button>
                                </OverlayTrigger>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            )
            }
        </>
    )
}

const mapToStateProps = (state) => {
    return {
      authenticated: state.authReducer.token.authenticated,
      profile: state.authReducer.profile
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
    mapToStateProps,
    mapDispatchToProps
)(Main)