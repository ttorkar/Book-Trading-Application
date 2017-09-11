import React, { Component } from 'react';
import { Row, Col, Thumbnail, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as api from '../api/api';
import actionCreators from '../actions/actionCreators';
import * as _ from 'lodash';

class Books extends Component {
    componentDidMount() {
        this.fetchBooks();
        this.fetchOutRequests();
    }
    fetchBooks() {
        api.request('books/all', 'get')
            .then(res => {
                this.props.fetchBooks(res.data);
            })
    }
    fetchOutRequests() {
        api.request('requests/outcoming', 'get')
            .then(res => {
                this.props.fetchOutRequests(res.data);
            })
    }
    requestBook(id) {
        api.request(`books/${id}/request`, 'get')
            .then(res => {
                this.props.requestBook(res.data);
            })
    }
    render() {
        const books = this.props.books.map(book => {
            let ownerInfo = `${book.owner.name}`;
            if (book.owner.country || book.owner.town) {
                ownerInfo += ` ( ${book.owner.country} ${book.owner.town} )`;
            }

            const isRequested = _.some(this.props.outRequests, request => {
                return request.from._id === this.props.user._id && request.book._id === book._id;
            });

            return (
                <Col className="book" xs={6} sm={6} md={4} key={book._id}>
                    <Thumbnail className="bookcard" src={book.img}>
                        <h4>{book.title}</h4>
                        <p className="small text-muted">{book.authors.join(', ')}</p>
                        <p><b>Owner: </b>{ownerInfo}</p>
                        <p>
                            {!isRequested &&
                            <Button bsStyle="primary" onClick={this.requestBook.bind(this, book._id)}>Request</Button>}

                            {isRequested &&
                            <Button bsStyle="primary" disabled>Already requested</Button>}
                        </p>
                    </Thumbnail>
                </Col>
            )
        });

        return (
            <div className="container wrapper">
                <div className="books">
                    <Row>
                        {books}
                    </Row>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    books: state.allBooks,
    user: state.user,
    outRequests: state.outRequests
});

const mapDispatchToProps = (dispatch) => ({
    fetchBooks: (books) => {
        dispatch(actionCreators.fetchAllBooks(books));
    },
    fetchOutRequests: (requests) => {
        dispatch(actionCreators.fetchOutRequests(requests))
    },
    requestBook: (request) => {
        dispatch(actionCreators.requestBook(request));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);