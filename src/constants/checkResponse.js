import openNotification from '../constants/Notification';

const checkResponse = (response) => {
    if(response.data && response.data[0] && response.data[0] == 'error' && response.data[1] == 'token_expired') {
        window.localStorage.setItem('account', null);
        openNotification('error', 'Your account has expired! Please login again');
        this.props.history.push('login');
    }
    
    if(response.data && response.data[0] && response.data[0] == 'error' && response.data[1] == 'account_baned') {
        window.localStorage.setItem('account', null);
        openNotification('error', 'Your account has been baned! Please contact Game Manager!');
        this.props.history.push('login');
    }
}
export default checkResponse;