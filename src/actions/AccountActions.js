import * as types from '../constants/actionTypes';
import APPCONFIG from '../constants/appConfig';
import axios from '../constants/axios';
import checkResponse from '../constants/checkResponse';

export const getAccountInfo = () => {
  return (dispatch) => {
    return axios.get(`${APPCONFIG.apiUri}auth/info`)
    .then(response => {
      checkResponse(response);
      dispatch(setStatus(types.ACCOUNT_INFO, response.data));
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

export const getZoneList = () => {
  return (dispatch) => {
    return axios.get(`${APPCONFIG.apiUri}zone/getList`)
    .then(response => {
      checkResponse(response);
      dispatch(setStatus(types.ZONE_LIST, response.data));
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

export const getCharList = () => {
  return (dispatch) => {
    return axios.get(`${APPCONFIG.apiUri}char/getList`)
    .then(response => {
      checkResponse(response);
      dispatch(setStatus(types.CHAR_LIST, response.data));
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

export const getDepositList = () => {
  return (dispatch) => {
    return axios.get(`${APPCONFIG.apiUri}deposit/getList`)
    .then(response => {
      checkResponse(response);
      dispatch(setStatus(types.DEPOSIT_LIST, response.data));
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

export const getTypeDepositList = () => {
  return (dispatch) => {
    return axios.get(`${APPCONFIG.apiUri}deposit/getTypeList`)
    .then(response => {
      checkResponse(response);
      dispatch(setStatus(types.DEPOSIT_TYPE_LIST, response.data));
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

export const buyPackage = (params) => {
  return (dispatch) => {
    return axios.post(`${APPCONFIG.apiUri}deposit/buyPackage`, params)
    .then(response => {
      checkResponse(response);
      dispatch(setStatus(types.BUY_PACKAGE_STATUS, response.data));
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

export const getLogs = () => {
  return (dispatch) => {
    return axios.get(`${APPCONFIG.apiUri}account/getLogs`)
    .then(response => {
      checkResponse(response);
      dispatch(setStatus(types.GET_LOGS, response.data));
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

export const changePassword = (params) => {
  return (dispatch) => {
    return axios.post(`${APPCONFIG.apiUri}account/changePassword`, params)
    .then(response => {
      checkResponse(response);
      dispatch(setStatus(types.CHANGE_PASSWORD, response.data));
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

export const resetBuyPackageStatus = () => {
    return {type: types.RESET_BUY_PACKAGE_STATUS};
}

export const resetStatusAllList = () => {
    return {type: types.RESET_STATUS_ALL_LIST};
}

export const resetStatusAccountInfo = () => {
    return {type: types.RESET_STATUS_ACCOUNT_INFO};
}

export const resetStatusGetLogs = () => {
    return {type: types.RESET_STATUS_GET_LOGS};
}

export const resetChangePassword = () => {
    return {type: types.RESET_CHANGE_PASSWORD};
}