import React, { Component } from 'react';
import { Route } from 'react-router';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Books from './Books';
import Dashboard from './Dashboard';
import LoggedInRoute from '../utils/LoggedInRoute';
import LoggedOutRoute from '../utils/LoggedOutRoute';

export default class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={LoggedOutRoute(Login)} />
                <Route path="/register" component={LoggedOutRoute(Register)} />
                <Route path="/profile" component={LoggedInRoute(Profile)} />
                <Route path="/books" component={LoggedInRoute(Books)} />
                <Route path="/dashboard" component={LoggedInRoute(Dashboard)}/>
            </div>
        )
    }
}

