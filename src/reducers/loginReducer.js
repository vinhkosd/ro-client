import * as types from '../constants/actionTypes';

const initialState = {
    status: {
        data: [],
        status: false
    }
};

const login = (state = initialState, action) => {
  let status = state.status;

  
  switch (action.type) {
    case types.LOGIN_STATUS:
        return {
            ...state,
            status: {
                ...status,
                data: action.payload.data,
                status: true
            }
    };
    case types.RESET_LOGIN_STATUS:
        return {
            ...state,
            status: initialState.status
        }
    default:
      return state; 
  }
};
export default login;
