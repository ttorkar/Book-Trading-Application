import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const LoggedOutRoute = (ComposedComponent) => {
    class Auth extends Component {
        render() {
            return !this.props.user ? <ComposedComponent/> : <Redirect to="/books" />
        }
    }

    const mapStateToProps = (state) => ({
        user: state.user
    });

    const mapDispatchToProps = () => ({});

    return connect(mapStateToProps, mapDispatchToProps)(Auth);
};


export default LoggedOutRoute;