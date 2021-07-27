import * as types from '../constants/actionTypes';

const initialState = {
    info: {
        data: [],
        status: false
    },
    config: {
        data: [],
        status: false
    },
    charge_config: {
        data: [],
        status: false
    },
    list_currency: {
        data: [],
        status: false
    },
};

const payment = (state = initialState, action) => {
  let info = state.info;
  let config = state.config;
  let charge_config = state.charge_config;
  let list_currency = state.list_currency;
  
  switch (action.type) {
    case types.PAYMENT_STATUS:
        return {
            ...state,
            info: {
                ...info,
                data: action.payload.data,
                status: true
            }
    };

    case types.RESET_PAYMENT_STATUS:
        return {
            ...state,
            info: {
                ...info,
                status: false
            },
    };

    case types.PAYPAL_CONFIG:
        return {
            ...state,
            config: {
                ...config,
                data: action.payload.data,
                status: true
            }
    };

    case types.RESET_STATUS_PAYPAL_CONFIG:
        return {
            ...state,
            config: {
                ...config,
                status: false
            },
    };
    
    case types.CHARGE_CONFIG:
        return {
            ...state,
            charge_config: {
                ...charge_config,
                data: action.payload.data,
                status: true
            }
    };
    
    case types.RESET_STATUS_CHARGE_CONFIG:
        return {
            ...state,
            charge_config: {
                ...charge_config,
                status: false
            },
    };
    
    case types.LIST_CURRENCY:
        return {
            ...state,
            list_currency: {
                ...list_currency,
                data: action.payload.data,
                status: true
            }
    };
    
    case types.RESET_STATUS_LIST_CURRENCY:
        return {
            ...state,
            list_currency: {
                ...list_currency,
                status: false
            },
    };
    default:
      return state; 
  }
};
export default payment;
