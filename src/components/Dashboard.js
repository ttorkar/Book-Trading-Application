import React, { Component } from 'react';
import { Col, Row, Button, Thumbnail, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import NewBook from './NewBook';
import actionCreators from '../actions/actionCreators';
import classNames from 'classnames';
import * as api from '../api/api';

class Dashboard extends Component {
    componentDidMount() {
        this.fetchUserBooks();
        this.fetchOutRequests();
        this.fetchIncRequests();
    }
    deleteBook(id) {
        api.request(`books/delete/${id}`, 'get')
            .then(() => {
                this.props.deleteBook(id);
            })
    }
    fetchIncRequests() {
        api.request('requests/incoming', 'get')
            .then(res => {
                this.props.fetchIncRequests(res.data);
            })
    }
    fetchOutRequests() {
        api.request('requests/outcoming', 'get')
            .then(res => {
                this.props.fetchOutRequests(res.data);
            })
    }
    fetchUserBooks() {
        api.request('books/personal', 'get')
            .then(res => {
                this.props.fetchBooks(res.data);
            })
    }
    handleAddBook(book) {
        this.props.addBook(book);
    }
    approveRequest(id) {
        api.request(`requests/${id}/approve`, 'get')
            .then(res => {
                this.props.approveRequest(res.data);
            })
    }
    rejectRequest(id) {
        api.request(`requests/${id}/reject`, 'get')
            .then(res => {
                this.props.rejectRequest(res.data);
            })
    }
    render() {
        const books = this.props.books.map(book => {
            return (
                <Col className="book" xs={6} sm={6} md={4} key={book._id}>
                    <Thumbnail className="bookcard" src={book.img}>
                        <h4>{book.title}</h4>
                        <p className="small text-muted">{book.authors.join(', ')}</p>
                        <p>
                            <Button bsStyle="danger" onClick={this.deleteBook.bind(this, book._id)}>Delete</Button>
                        </p>
                    </Thumbnail>
                </Col>
            )
        });

        let incRequests = '';
        if (this.props.incRequests.length) {
            incRequests = (
                <div>
                    <h4>Incoming</h4>
                    <Table>
                        <thead>
                        <tr>
                            <th>Book</th>
                            <th>Created</th>
                            <th>From</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.incRequests.map(request => {
                            return (
                                <tr key={request._id} className={classNames({
                                        'success': request.status === 'approved',
                                        'danger': request.status === 'rejected'
                                    })}>
                                    <td>{request.book.title}</td>
                                    <td>{moment(request.createdAt).format('MM/DD/YY')}</td>
                                    <td>{request.from.name}</td>
                                    <td>{request.status}</td>
                                    <td>
                                        <Button bsStyle="success" disabled={request.status !== 'pending'}
                                                onClick={this.approveRequest.bind(this, request._id)}>
                                            Approve
                                        </Button>
                                    </td>
                                    <td>
                                        <Button bsStyle="danger" disabled={request.status !== 'pending'}
                                                onClick={this.rejectRequest.bind(this, request._id)}>
                                            Reject
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </div>
            );
        }

        let outRequests = '';
        if (this.props.outRequests.length) {
            outRequests = (
                <div>
                    <h4>Outcoming</h4>
                    <Table>
                        <thead>
                        <tr>
                            <th>Book</th>
                            <th>Created</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.outRequests.map(request => {
                            return (
                                <tr key={request._id} className={classNames({
                                        'success': request.status === 'approved',
                                        'danger': request.status === 'rejected'
                                    })}>
                                    <td>{request.book.title}</td>
                                    <td>{moment(request.createdAt).format('MM/DD/YY')}</td>
                                    <td>{request.to.name}</td>
                                    <td>{request.status}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </div>
            )
        }

        return (
            <div className="container wrapper">
                <NewBook onAddBook={this.handleAddBook.bind(this)}/>
                <div className="books">
                    <Row>
                        {books}
                    </Row>
                </div>

                {incRequests}
                {outRequests}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    books: state.userBooks,
    outRequests: state.outRequests,
    incRequests: state.incRequests
});

const mapDispatchToProps = (dispatch) => ({
    fetchBooks: (books) => {
        dispatch(actionCreators.fetchUserBooks(books));
    },
    fetchOutRequests: (requests) => {
        dispatch(actionCreators.fetchOutRequests(requests));
    },
    fetchIncRequests: (requests) => {
        dispatch(actionCreators.fetchIncRequests(requests));
    },
    addBook: (book) => {
        dispatch(actionCreators.addBook(book));
    },
    deleteBook: (id) => {
        dispatch(actionCreators.deleteBook(id));
    },
    approveRequest: (request) => {
        dispatch(actionCreators.approveRequest(request));
    },
    rejectRequest: (request) => {
        dispatch(actionCreators.rejectRequest(request));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
