import React, { Component } from 'react';
import Navigation from './Navigation';
import Main from './Main';
import Footer from './Footer';

export default class App extends Component {
    render() {
        return (
            <div className="main">
                <Navigation />
                <Main />
                <Footer />
            </div>
        )
    }
}

