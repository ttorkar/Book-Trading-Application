import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import actionCreators from '../actions/actionCreators';
import { withRouter } from 'react-router-dom';

class NavigationComponent extends Component {
    render() {
        let navTitle = '';
        if (this.props.user) {
            navTitle = (
                <span>Hello <b>{this.props.user.name}</b></span>
            );
        }
        return (
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/"><Glyphicon glyph="book" /></Link>
                    </Navbar.Brand>
                </Navbar.Header>
                {this.props.user && <Nav>
                    <LinkContainer to="/books">
                        <NavItem eventKey={4}>Books</NavItem>
                    </LinkContainer>
                </Nav>}
                {!this.props.user && <Nav pullRight>
                    <LinkContainer to="/login">
                        <NavItem eventKey={1}>Login</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/register">
                        <NavItem eventKey={2}>Register</NavItem>
                    </LinkContainer>
                </Nav>}
                {this.props.user && <Nav pullRight>
                    <NavDropdown eventKey={3} title={navTitle} id="nav-dropdown">
                        <LinkContainer to="dashboard">
                            <MenuItem eventKey={3.1}><Glyphicon glyph="user"/>Dashboard</MenuItem>
                        </LinkContainer>
                        <LinkContainer to="profile">
                            <MenuItem eventKey={3.2}><Glyphicon glyph="cog"/>Settings</MenuItem>
                        </LinkContainer>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3} onClick={this.props.logout}>
                            <Glyphicon glyph="log-out"/>Logout
                        </MenuItem>
                    </NavDropdown>
                </Nav>}
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        dispatch(actionCreators.logout());
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationComponent));
