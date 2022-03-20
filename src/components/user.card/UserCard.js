import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import { Container, Row, Col, Badge, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

const UserCard = ({ user, username, logout }) => {
    const getUserFullname = (name = '') => {
        name += user.lastname
        name += " " + user.firstname
        name += (user.patronymic ? " " + user.patronymic : "")

        return name
    }
    
    return (
        <div>
            <p className="text-500 fs-5">Мой профиль</p>
            <div className="position-relative border rounded-extra bg-white p-3">
                <p
                    style={{margin: "0"}} 
                    className="text-700"
                >
                    {getUserFullname()}
                </p>
                <div className="">
                    <Badge
                        pill 
                        bg="primary"
                    >
                        {user.role}
                    </Badge>{' '}
                    <Badge 
                        pill 
                        bg="primary"
                    >
                        Прокуратура
                    </Badge>
                </div>
            </div>
            {/* <div className="border rounded-extra bg-white p-3">

            </div> */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authReducer.token.authenticated,
        username: state.authReducer.username,
        user: state.authReducer.profile
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
)(UserCard)