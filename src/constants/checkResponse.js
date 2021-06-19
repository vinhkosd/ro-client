const checkResponse = (response) => {
    if(response.data && response.data[0] && response.data[0] == 'error' && response.data[1] == 'token_expired') {
        window.localStorage.setItem('account', null);
        alert('Your account has expired! Please login again')
        window.location.href = '';
    }
}
export default checkResponse;