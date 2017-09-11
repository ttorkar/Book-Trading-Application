import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import FormWithValidation from './shared/FormWithValidation';
import TextInputGroup from './shared/TextInputGroup';
import actionCreators from '../actions/actionCreators';

class Profile extends Component {
    handleSuccess(data) {
        this.props.updateProfile(data.token);
    }
    render() {
        return (
            <div className="container">
                <Row>
                    <Col md={8} xs={12}>
                    <div className='white_background'>
                        <FormWithValidation buttonCaption="Update"
                                            method="post"
                                            url="update"
                                            onSuccess={this.handleSuccess.bind(this)}
                                            successMessage="Profile updated successfully"
                                            clearOnSuccess={false}>

                            <TextInputGroup type="text"
                                            name="name"
                                            value={this.props.user.name}
                                            displayName="Full name"
                                            placeholder="Full name"
                                            required={true}/>

                            <TextInputGroup type="text"
                                            name="country"
                                            value={this.props.user.country}
                                            displayName="Country"
                                            placeholder="Country"/>

                            <TextInputGroup type="text"
                                            name="town"
                                            value={this.props.user.town}
                                            displayName="Town"
                                            placeholder="Town"/>

                        </FormWithValidation>

                        <h2>Change password</h2>
                        <FormWithValidation buttonCaption="Change"
                                            method="post"
                                            url="change-password"
                                            successMessage="Password changed successfully">

                            <TextInputGroup type="password"
                                            name="oldPassword"
                                            displayName="Old password"
                                            placeholder="Old password"
                                            required={true}/>

                            <TextInputGroup type="password"
                                            name="newPassword"
                                            displayName="New password"
                                            placeholder="New password"
                                            required={true}
                                            minLength={6}/>
                        </FormWithValidation>
                        </div>

                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    updateProfile: (token) => {
        dispatch(actionCreators.updateProfile(token));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
