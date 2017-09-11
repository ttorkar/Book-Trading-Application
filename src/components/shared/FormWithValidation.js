import React, { Component } from 'react';
import { Form, FormGroup, Button, Alert, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as api from '../../api/api';

export default class FormWithValidation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errorMessage: '',
            successMessage: '',
            valid: false,
            fields: {}
        };
        this.fieldComponents = [];
        this.components = [];
    }
    addComponent(component) {
        this.components.push(component);
    }
    componentWillMount() {
        this.cloneFields();
    }
    cloneFields() {
        let fields = {};
        this.fieldComponents = this.props.children.map(child => {
            fields[child.props.name] = {value: this.props.value, valid: false};
            return React.cloneElement(child, {
                key: child.props.name,
                onFieldChange: this.onFieldChange.bind(this),
                addComponent: this.addComponent.bind(this)
            });
        });
        this.setState({fields});
    }
    checkFormValidity() {
        let fields = this.state.fields;
        let valid = true;
        for (let field in fields) {
            if (fields.hasOwnProperty(field)) {
                if (!fields[field].valid) {
                    valid = false;
                    break;
                }
            }
        }
        this.setState({valid});
    }
    updateForm() {
        this.components.forEach(component => {
            component.reset();
        })
    }
    onFieldChange(fieldName, fieldState) {
        let fields = this.state.fields;
        fields[fieldName] = fieldState;
        this.checkFormValidity();
    }
    handleSubmit(e) {
        this.setState({errorMessage: '', successMessage: '', loading: true});
        let fields = this.state.fields;
        let values = {};
        for (let field in fields) {
            if (fields.hasOwnProperty(field)) {
                values[field] = fields[field].value;
            }
        }

        if (this.props.onSubmit) {
            this.props.onSubmit(values);
        }

        if (this.props.url && this.props.method) {
            api.request(this.props.url, this.props.method, values)
                .then((res) => {
                    const successMessage = this.props.successMessage || 'Data submitted successfully';

                    this.setState({loading: false, successMessage});

                    if (this.props.clearOnSuccess) {
                        this.updateForm();
                    }

                    if (this.props.onSuccess) {
                        this.props.onSuccess(res.data);
                    }
                })
                .catch((err) => {
                    const errorMessage = (err.response && err.response.data && err.response.data.message)
                        || this.props.errorMessage
                        || 'An error occurred';

                    this.setState({loading: false, errorMessage});

                    if (this.props.onError) {
                        this.props.onError(err);
                    }
                })
        }

        e.preventDefault();
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>

                <input type="email" name="email" className="hidden"/>       {/* fuck you autocomplete */}
                <input type="password" name="password" className="hidden"/>

                {this.state.successMessage && <Alert bsStyle="success">{this.state.successMessage}</Alert>}

                {this.state.errorMessage && <Alert bsStyle="danger">{this.state.errorMessage}</Alert>}

                {this.fieldComponents}

                <FormGroup>
                    <Button type="submit"
                            bsStyle="success"
                            block={this.props.isBlockButton}
                            disabled={this.state.loading || !this.state.valid}>
                        {this.props.buttonCaption}
                        {this.state.loading && <Glyphicon glyph="glyphicon glyphicon-repeat" className="loader"/>}
                    </Button>
                </FormGroup>

            </Form>
        )
    }
}

FormWithValidation.defaultProps = {
    clearOnSuccess: true
};

FormWithValidation.propTypes = {
    buttonCaption: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    onSubmit: PropTypes.func,
    url: PropTypes.string,
    method: PropTypes.string,
    onSuccess: PropTypes.func,
    successMessage: PropTypes.string,
    onError: PropTypes.func,
    errorMessage: PropTypes.string,
    isBlockButton: PropTypes.bool
};