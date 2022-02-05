import React, { useState } from 'react';
import { Nav } from 'react-bootstrap'
import { createBrowserHistory } from 'history'
import { items } from './SidebarData.js'
import { connect } from 'react-redux';

import './sidebar.css'
import * as Icon from 'react-bootstrap-icons';

const Sidebar = (props) => {
    const history = createBrowserHistory()
    const [textColor, setTextColor] = useState('')

    const handleLogout = () => props.logout()

    return (
        <div className="nav-menu">
            <Nav variant="pills" className="flex-column" defaultActiveKey={history.location.pathname}>
                <div>
                    <p>{props.username}</p>
                </div>
                {/* <div>
                    <img className="prok-icon" src='./prok.png' alt="img" />
                    <span className="header-text">
                        Qadagalaushy
                    </span>
                </div> */}
                <div className="mt-5">
                    {items.map((item, index) => 
                        <Nav.Item key={index}>
                            <Nav.Link href={item.path}>
                                {item.icon}
                                <span className="item-text">
                                    {item.title}
                                </span>
                            </Nav.Link>
                        </Nav.Item>
                    )}
                </div>
            </Nav>

            <Nav className="flex-column mt-5">
                <Nav.Item>
                    <Nav.Link onClick={handleLogout}>
                        <Icon.XSquareFill size="30" />
                        <span className="item-text">
                            Выйти
                        </span>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
};

const mapToStateProps = (state) => {
    return {
      authenticated: state.authReducer.token.authenticated,
      username: state.authReducer.username
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
  )(Sidebar)

