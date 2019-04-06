import React from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3300/api/jokes';

axios.interceptors.request.use(
    options => {
        options.headers.Authorization = localStorage.getItem('JWT');
        return options
    },

    err => {
        return Promise.reject(err);
    }
);

export default (Component) => {
    return class Authenticated extends React.Component {
        render() {
            const token = localStorage.getItem('JWT');
            const fail = <h2>Please Login</h2>;

            return <>
                     { token ? <Component { ...this.props } />
                             : fail }
                   </>
        }
    }
}