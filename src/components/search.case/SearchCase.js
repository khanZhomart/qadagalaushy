import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { connect } from 'react-redux';

import { Accordion, Tab, Nav, Button, Col, Card, Container, Row, Spinner, InputGroup, FormControl, Form } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import Sidebar from '../nav/Sidebar';
import docApi from '../../api/doc.api';

import './search.case.css'
import SearchByDocId from './search.docid/SearchByDocId';
import SearchDocByUsername from './search.username/SearchDocByUsername';
import { Redirect } from 'react-router-dom';

const SearchCase = (props) => {

    return (
        <>
            {props.authenticated ? (
                <>
                    <Container fluid>
                        <Row>
                            <Col md={3} lg={3}>
                                <Sidebar />
                            </Col>
                            <Col md={9} lg={9}>
                                <div style={{paddingLeft: "50px"}}>
                                    <FadeIn>
                                        <div className='mt-5'>
                                            <p className='title'>Найти дело</p>
                                                <div className="w-75 mt-5" style={{height: "800px"}}>
                                                    <Tab.Container id="" defaultActiveKey="first">
                                                        <Nav variant="pills" className="flex-row">
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="first">По номеру дела</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="second">По ответственному лицу</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="third">По дате назначения</Nav.Link>
                                                            </Nav.Item>
                                                        </Nav>
                                                        <Tab.Content>
                                                            <Tab.Pane eventKey="first" className='mt-5'>
                                                                <SearchByDocId />
                                                            </Tab.Pane>

                                                            <Tab.Pane eventKey="second" className='mt-5'>
                                                                <SearchDocByUsername />
                                                            </Tab.Pane>

                                                            <Tab.Pane eventKey="third" className='mt-5'>

                                                            </Tab.Pane>
                                                        </Tab.Content>
                                                    </Tab.Container>
                                                </div>
                                        </div>
                                    </FadeIn>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </>
            ) : (
                <>
                    <Redirect push to="/login" />
                </>
            )}
        </>
    )
}

const mapToStateProps = (state) => {
    return {
      authenticated: state.authReducer.token.authenticated,
      token: state.authReducer.token.accessToken,
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
)(SearchCase)
