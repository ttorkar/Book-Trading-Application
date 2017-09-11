import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import PropTypes from 'prop-types';
import * as api from '../api/api';

export default class NewBook extends Component {
    constructor(props) {
        super(props);
        this.items = [];
        this.state = {
            loading: false,
            errorMessage: '',
            book: null
        }
    }
    submit() {
        if (this.state.book !== null) {
            this.setState({loading: true, errorMessage: ''});
            api.request('books/add', 'post', this.items[this.state.book])
                .then((res) => {
                    this.setState({loading: false});
                    this.props.onAddBook(res.data);
                    this.setState({book: null});
                })
                .catch((err) => {
                    const errorMessage = (err.response && err.response.data && err.response.data.message)
                        || 'An error occurred';
                    this.setState({loading: false, errorMessage});
                })
        }
    }
    getOptions(input, callback) {
        if (input) {
            api.request(`books/find?q=${input}`, 'get').then((res) => {
                this.items = res.data;
                const options = this.items.map((item, i) => {
                    const authors = (item.authors && `(${item.authors.join(', ')})`) || '';
                    return {value: i, label: `${item.title} ${authors}`}
                });
                callback(null, {options, complete: true});
            })
        } else {
            callback(null, {options: [], complete: true});
        }
    }
    handleChange(book) {
        const value = book ? book.value : null;
        this.setState({book: value});
    }
    render() {
        return (
            <div className="select-wrapper">

                <Select.Async
                    name="new-book"
                    value={this.state.book}
                    loadOptions={this.getOptions.bind(this)}
                    onChange={this.handleChange.bind(this)}/>

                <Button bsStyle="primary"
                        disabled={this.state.book === null || this.state.loading}
                        onClick={this.submit.bind(this)}>
                    Add book
                </Button>
            </div>
        )
    }
}

NewBook.propTypes = {
    onAddBook: PropTypes.func.isRequired
};
