import React, { useLayoutEffect, useState } from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

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
    const [width, height] = useWindowSize()



    return (
        <>
            <div className="mx-auto mt-2" style={{width: "95%"}}>
                <Navbar 
                    className="rounded-extra"
                    bg="dark" 
                    variant="dark" 
                    expand="lg"
                >
                    <Container>
                        <Navbar.Brand  href="#home">
                            Qadagalauhsy <span className="text-muted" style={{fontSize: "15px"}}>v0.7 beta</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Nav.Link href="#home">Главная</Nav.Link>
                                <NavDropdown 
                                    title="Dropdown" 
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
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