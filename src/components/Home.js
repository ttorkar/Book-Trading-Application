import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="banner text-center">
                    <h1>Book Trading Application</h1>
                </div>
                <div className='home_btns'>
                <LinkContainer to="/login">
                    <NavItem eventKey={1}>Login</NavItem>
                </LinkContainer>
                </div>
                <div className='home_btns'>
                <LinkContainer to="/register">
                    <NavItem eventKey={2}>Register</NavItem>
                </LinkContainer>
                </div>
              </div>

        )
    }
}
