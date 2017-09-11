import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import history from '../history';
import FormWithValidation from './shared/FormWithValidation';
import TextInputGroup from './shared/TextInputGroup';
import actionCreators from '../actions/actionCreators';

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleSuccess = this.handleSuccess.bind(this);
    }
    handleSuccess(data) {
        this.props.register(data.token);
        history.push('books');
    }
    render() {
        return (
            <div className="container wrapper">
                <Grid>
                    <Row>
                        <Col xs={12} sm={6} smOffset={3} md={4} mdOffset={4}>
                        <div className='white_background'>
                            <FormWithValidation buttonCaption="Register"
                                                url="register"
                                                method="post"
                                                isBlockButton={true}
                                                onSuccess={this.handleSuccess.bind(this)}>

                                <TextInputGroup type="text"
                                                name="name"
                                                displayName="Full name"
                                                placeholder="Full name"
                                                required={true}/>

                                <TextInputGroup type="email"
                                                name="email"
                                                displayName="Email"
                                                placeholder="Email"
                                                required={true}/>

                                <TextInputGroup type="password"
                                                name="password"
                                                displayName="Password"
                                                placeholder="Password"
                                                minLength={6}
                                                required={true}/>

                            </FormWithValidation>

                            <div className="text-center">
                                <Link to="/login">
                                    Already registered? Log in
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

let mapDispatchToProps = (dispatch) => ({
    register: (token) => {
        dispatch(actionCreators.register(token));
    }
});

export default connect(() => ({}), mapDispatchToProps)(Register);
