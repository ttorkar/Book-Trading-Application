import jwtDecode from 'jwt-decode';

const tokenKey = 'bs-token';

export const setToken = (token) => {
    localStorage.setItem(tokenKey, token);
};

export const removeToken = () => {
    localStorage.removeItem(tokenKey);
};

export const getToken = () => {
    return localStorage.getItem(tokenKey);
};

export const getUser = (token) => {
    return token ? jwtDecode(token) : null;
};