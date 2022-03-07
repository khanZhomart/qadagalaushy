import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { items } from './NavbarData.js'

import './nav.css'

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }

      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
}

const NavigationBar = (props) => {
    const [classes, setClasses] = useState("mx-auto mt-2 ")

    useLayoutEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 800)
                setClasses("mx-auto mt-2 w-95")
            else
                setClasses("mx-auto mt-2 w-90")
        })
    }, [])

    useEffect(() => {

    }, [classes])

    return (
        <>
            <div className="">
                <Navbar 
                    className=""
                    bg="dark"
                    variant='dark'
                    expand="lg"
                >
                    <Container 
                        className=""
                        fluid
                    >
                        <Navbar.Brand>
                            <img 
                                src="/prok.png"
                                width="30"
                                height="30"
                                alt="prok"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="justify-content-start">
                            <Nav>
                                <Nav.Link className="items" href="/home">
                                    Журнал
                                </Nav.Link>
                                <Nav.Link className="items" href="/case/create">
                                    Новое дело
                                </Nav.Link>
                                <Nav.Link 
                                    className="items"
                                    onClick={() => props.logout()}    
                                >
                                    Выйти из аккаунта
                                </Nav.Link>
                            </Nav>
                            {/* <Nav>
                                <NavDropdown
                                    title="Панель" 
                                    id="basic-nav-dropdown"
                                >
                                    {items.map((item, index) => {
                                        return (
                                            <NavDropdown.Item
                                                href={item.path}
                                                key={index}
                                            >
                                                {item.icon}
                                                <span className="px-2">{item.title}</span>
                                            </NavDropdown.Item>
                                        )
                                    })}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        onClick={() => props.logout()}
                                    >
                                        <Icon.BoxArrowLeft size="20" />
                                        <span className="px-2">Выйти</span>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav> */}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

            {props.authenticated ? (
                <></>
            ) : (
                <Redirect push to="/login" />
            )}
        </>
    )
}

const mapToStateProps = (state) => {
    return {
      authenticated: state.authReducer.token.authenticated,
      token: state.authReducer.token.accessToken,
      profile: state.authReducer.profile,
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
)(NavigationBar)