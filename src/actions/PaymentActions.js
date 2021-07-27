import * as types from '../constants/actionTypes';
import APPCONFIG from '../constants/appConfig';
import axios from '../constants/axios';
import checkResponse from '../constants/checkResponse';

export const processPayment = (params) => {
  return (dispatch) => {
    return axios.post(`${APPCONFIG.apiUri}payment/processPayment`, params)
    .then(response => {
      checkResponse(response);
      dispatch(setStatus(types.PAYMENT_STATUS, response.data));
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

          if (error.response.status == 422){
            dispatch(setStatus(types.PAYMENT_STATUS, error.response.data));
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


export const getPaypalConfig = () => {
    return (dispatch) => {
      return axios.get(`${APPCONFIG.apiUri}payment/getPaypalConfig`)
      .then(response => {
        checkResponse(response);
        dispatch(setStatus(types.PAYPAL_CONFIG, response.data));
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
  
export const getChargeConfig = () => {
  return (dispatch) => {
    return axios.get(`${APPCONFIG.apiUri}payment/getChargeConfig`)
    .then(response => {
      checkResponse(response);
      dispatch(setStatus(types.CHARGE_CONFIG, response.data));
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

export const paymentHoldCharge = (params) => {
  return (dispatch) => {
    return axios.post(`${APPCONFIG.apiUri}payment/paymentHoldCharge`, params)
    .then(response => {
      checkResponse(response);
      dispatch(setStatus(types.PAYMENT_STATUS, response.data));
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

          if (error.response.status == 422){
            dispatch(setStatus(types.PAYMENT_STATUS, error.response.data));
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

export const listCurrency = () => {
  return (dispatch) => {
    return axios.get(`${APPCONFIG.apiUri}payment/listCurrency`)
    .then(response => {
      checkResponse(response);
      dispatch(setStatus(types.LIST_CURRENCY, response.data));
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

export const resetProcessPaypalStatus = () => {
  return {type: types.RESET_PAYMENT_STATUS};
}

export const resetStatusPaypalConfig = () => {
  return {type: types.RESET_STATUS_PAYPAL_CONFIG};
}


export const resetStatusChargeConfig = () => {
  return {type: types.RESET_STATUS_CHARGE_CONFIG};
}

export const resetStatusListCurrency = () => {
  return {type: types.RESET_STATUS_LIST_CURRENCY};
}

