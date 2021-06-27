import * as types from '../constants/actionTypes';

const initialState = {
    check_code: {
        data: [],
        status: false
    }
};

const account = (state = initialState, action) => {
  let check_code = state.check_code;
  
  switch (action.type) {
    case types.CHECK_CODE_STATUS:
        return {
            ...state,
            check_code: {
                ...check_code,
                data: action.payload.data,
                status: true
            }
    };

    case types.RESET_CHECK_CODE_STATUS:
        return {
            ...state,
            check_code: initialState.check_code
    };

    default:
      return state; 
  }
};
export default account;
