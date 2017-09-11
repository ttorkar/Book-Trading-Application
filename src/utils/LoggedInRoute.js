import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const LoggedInRoute = (ComposedComponent) => {
    class Auth extends Component {
        render() {
            return this.props.user ? <ComposedComponent/> : <Redirect to="/login" />
        }
    }

    const mapStateToProps = (state) => ({
        user: state.user
    });

    const mapDispatchToProps = () => ({});

    return connect(mapStateToProps, mapDispatchToProps)(Auth);
};


export default LoggedInRoute;