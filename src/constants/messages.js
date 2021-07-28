const MSG = {
    login: {
        wrong_account_or_password: 'Username/Email or Password was wrong!',
        success: 'Login success',
        account_baned: 'Your account has been baned! Please contact Game Manager!',
    },
    register:
    {
        account_not_available: 'Your username is not available, please try another username!',
        email_not_available: 'Your email is not available, please try another email!',
        success: 'Register success!',
        wrong_captcha: 'The captcha you entered does not match!',
    },
    payment: {
        success: 'Recharge success!',
        payment_not_approved: 'Payment is not approved, please contact Game Manager!',
    },
    forgot_password: {
        success: 'Reset Password success!',
        enter_code: 'Please enter the verification code we has sent into your email!',
    },
    change_email: {
        success: 'Change Email success!',
        enter_code: 'Please enter the verification code we has sent into your email!',
    },
    change_password: {
        success: 'Change Password success!',
        password_not_match: 'Your old password you had input was not match your account!',
        new_password_must_be_different: 'New password must be different from your old password!',
    },

    validateErrors: (errorData) => <p>{errorData.message} :<br/>{Object.values(errorData.errors).map(item => {return <div><strong>- {item.join(' ')}</strong></div>})}</p>,
}
export default MSG;