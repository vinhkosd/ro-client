import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// app logic reducers
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import accountReducer from './accountReducer';
import paymentReducer from './paymentReducer';

const rootReducer = combineReducers({
    routing: routerReducer,
    login: loginReducer,
    register: registerReducer,
    account: accountReducer,
    payment: paymentReducer,
});

export default rootReducer;
