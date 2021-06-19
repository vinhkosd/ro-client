import axios from 'axios';

axios.interceptors.request.use(function (config) {
    var token = window.localStorage.getItem('account') ? window.localStorage.getItem('account') : [];
    token = new Buffer(token).toString('base64');
    // const token = store.getState().session.token;
    config.headers.Authorization =  `bearer ${token}`;

    return config;
});
export default axios;