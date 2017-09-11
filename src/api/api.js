import axios from 'axios';
import store from '../store/store';
import actionCreators from '../actions/actionCreators';
import * as auth from '../auth/authHelpers';

export const request = (url, method, data) => {
    return axios.request({
        url,
        method,
        data,
        baseURL: 'http://localhost:9000/',
        headers: {'x-access-token': auth.getToken()}
    });
};

axios.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        if (err.response && err.response.status === 401) {
            store.dispatch(actionCreators.logout());
        }
        return Promise.reject(err);
    });