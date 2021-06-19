import * as types from '../constants/actionTypes';
import APPCONFIG from '../constants/appConfig';
import axios from 'axios';

export const login = (params) => {
    return (dispatch) => {
      return axios.post(`${APPCONFIG.apiUri}auth/login`, params)
      .then(response => {
        dispatch(setStatus(types.LOGIN_STATUS, response.data));
      }).catch((error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            if (error.response.status == 404){
              const message = "not found";
              console.log('message', message);
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
      });
    };
  };

export const setStatus = (type, data) => {
    return {
        type: type,
        payload: {
            data:data
        }
    };
};

export const loginResetStatus = () => {
    return { type: types.RESET_LOGIN_STATUS}
}