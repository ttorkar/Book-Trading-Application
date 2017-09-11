import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import history from '../history';
import FormWithValidation from './shared/FormWithValidation';
import TextInputGroup from './shared/TextInputGroup';
import actionCreators from '../actions/actionCreators';

class Login extends Component {
    handleSuccess(data) {
        this.props.login(data.token);
        history.push('books');
    }
    render() {
        return (
            <div className="container wrapper">

                <Grid>
                    <Row>
                        <Col xs={12} sm={6} smOffset={3} md={4} mdOffset={4}>
                          <div className='white_background'>
                            <FormWithValidation buttonCaption="Login"
                                                url="login"
                                                method="post"
                                                onSuccess={this.handleSuccess.bind(this)}
                                                isBlockButton={true}>

                                <TextInputGroup type="email"
                                                name="email"
                                                displayName="Email"
                                                placeholder="Email"
                                                required={true}/>

                                <TextInputGroup type="password"
                                                name="password"
                                                displayName="Password"
                                                placeholder="Password"
                                                required={true}/>

                            </FormWithValidation>

                            <div className="text-center">
                                <Link to="/register">
                                    Don't have an account yet? Register

                                </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (token) => {
        dispatch(actionCreators.login(token));
    }
});

export default connect(() => ({}), mapDispatchToProps)(Login);
