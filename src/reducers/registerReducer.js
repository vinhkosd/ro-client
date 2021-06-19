import * as types from '../constants/actionTypes';

const initialState = {
    status: {
        data: [],
        status: false
    }
};

const register = (state = initialState, action) => {
  let status = state.status;

  
  switch (action.type) {
    case types.REGISTER_STATUS:
        return {
            ...state,
            status: {
                ...status,
                data: action.payload.data,
                status: true
            }
    };
    case types.RESET_REGISTER_STATUS:
        return {
            ...state,
            status: initialState.status
        }
    default:
      return state; 
  }
};
export default register;
