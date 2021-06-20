import * as types from '../constants/actionTypes';

const initialState = {
    info: {
        data: [],
        status: false
    },
    zone: {
        data: [],
        status: false
    },
    char: {
        data: [],
        status: false
    },
    deposit: {
        data: [],
        status: false
    },
    deposit_type: {
        data: [],
        status: false
    },
    buy_package: {
        data: [],
        status: false
    },
    logs: {
        data: [],
        status: false
    },
    forgot_pass: {
        data: [],
        status: false
    },
    change_email: {
        data: [],
        status: false
    },
    change_password: {
        data: [],
        status: false
    },
};

const account = (state = initialState, action) => {
  let info = state.info;
  let zone = state.zone;
  let char = state.char;
  let deposit = state.deposit;
  let deposit_type = state.deposit_type;
  let buy_package = state.buy_package;
  let logs = state.logs;
  let forgot_pass = state.forgot_pass;
  let change_email = state.change_email;
  let change_password = state.change_password;
  
  switch (action.type) {
    case types.ACCOUNT_INFO:
        return {
            ...state,
            info: {
                ...info,
                data: action.payload.data,
                status: true
            }
    };
    case types.ACCOUNT_INFO_ERROR:
        return {
            ...state,
            info: {
                ...info,
                data: ['error'],
                status: true
            }
    };
    case types.ZONE_LIST:
        return {
            ...state,
            zone: {
                ...zone,
                data: action.payload.data,
                status: true
            }
    };
    case types.CHAR_LIST:
        return {
            ...state,
            char: {
                ...char,
                data: action.payload.data,
                status: true
            }
    };
    case types.DEPOSIT_LIST:
        return {
            ...state,
            deposit: {
                ...deposit,
                data: action.payload.data,
                status: true
            }
    };
    case types.DEPOSIT_TYPE_LIST:
        return {
            ...state,
            deposit_type: {
                ...deposit_type,
                data: action.payload.data,
                status: true
            }
    };
    case types.BUY_PACKAGE_STATUS:
        return {
            ...state,
            buy_package: {
                ...buy_package,
                data: action.payload.data,
                status: true
            }
    };

    case types.RESET_BUY_PACKAGE_STATUS:
        return {
            ...state,
            buy_package: initialState.buy_package
    };

    case types.RESET_STATUS_ALL_LIST:
        return {
            ...state,
            deposit_type: {
                ...deposit_type,
                status: false
            },
            zone: {
                ...zone,
                status: false
            },
            char: {
                ...char,
                status: false
            },
            deposit: {
                ...deposit,
                status: false
            },
    };

    case types.RESET_STATUS_ACCOUNT_INFO:
        return {
            ...state,
            info: {
                ...info,
                status: false
            },
    };

    case types.RESET_ACCOUNT_INFO:
        return {
            ...state,
            info: initialState.info,
    };

    case types.GET_LOGS:
        return {
            ...state,
            logs: {
                ...logs,
                data: action.payload.data,
                status: true
            },
    };

    case types.RESET_STATUS_GET_LOGS:
        return {
            ...state,
            logs: {
                ...logs,
                status: false
            },
    };
    case types.FORGOT_PASSWORD:
        return {
            ...state,
            forgot_pass: {
                ...forgot_pass,
                data: action.payload.data,
                status: true
            },
    };
    case types.RESET_FORGOT_PASSWORD:
        return {
            ...state,
            forgot_pass: {
                ...forgot_pass,
                status: false
            },
    };
    case types.CHANGE_EMAIL:
        return {
            ...state,
            change_email: {
                ...change_email,
                data: action.payload.data,
                status: true
            },
    };
    case types.RESET_CHANGE_EMAIL:
        return {
            ...state,
            change_email: {
                ...change_email,
                status: false
            },
    };

    case types.CHANGE_PASSWORD:
        return {
            ...state,
            change_password: {
                ...change_password,
                data: action.payload.data,
                status: true
            },
    };
    case types.RESET_CHANGE_PASSWORD:
        return {
            ...state,
            change_password: {
                ...change_password,
                status: false
            },
    };
    default:
      return state; 
  }
};
export default account;
