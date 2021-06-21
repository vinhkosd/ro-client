import './layout.css';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Spin, Typography  } from 'antd';
import * as EmailVerificationActions from '../actions/EmailVerificationActions';
import openNotification from '../constants/Notification';
import MSG from '../constants/messages';

class ForgotPassword extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        isEnterCode: false,
      }
    }

    componentDidMount() {
        const accountInfo = JSON.parse(window.localStorage.getItem('account'));
        if(accountInfo) {//user has login
            this.props.history.push('service')
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.account_forgot_pass.status) {
            this.setState({loading: false});
            const resetPassData = nextProps.account_forgot_pass.data;
            if(resetPassData[0] == 'error') {
                if(resetPassData[1] == 'send_mail') {
                    this.setState({isEnterCode: true});
                    openNotification('warning', resetPassData[2]);
                    openNotification('info', MSG.forgot_password.enter_code);
                } else {
                    openNotification('error', resetPassData[1]);
                }
            } else if(resetPassData.errors) {
                openNotification('error', MSG.validateErrors(resetPassData));
            } else {
                if(resetPassData[1] == 'send_mail') {
                    openNotification('success', MSG.forgot_password.enter_code);
                    this.setState({isEnterCode: true});
                } else if(resetPassData[1] == 'reset_password') {
                    openNotification('success', MSG.forgot_password.success);
                    this.setState({isEnterCode: false});
                    this.props.form.resetFields();
                } else {
                    openNotification('error', 'Cant handle forgot password module, please contact administrator');
                }
            }
            this.props.resetStatusForgotPassword();
        }
    }

    onFinish = (values) => {
        this.setState({
            loading: true
        }, () => {
            this.props.forgotPassword(values);
            //this.setState({isEnterCode: true});
        });
    };
    
    onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    render() {
        const layout = {
            // labelCol: { span: 8 },
            // wrapperCol: { span: 16 },
        };
        const tailLayout = {
            // wrapperCol: { offset: 8, span: 16 },
        };

        return (
            <Spin size="large" spinning={this.state.loading}>
                <div className="groups">
                    <div className="header-text">Forgot Password </div>
                    <div className="login">
                        <h4>Forgot Password</h4>
                        <hr></hr>
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{
                                // remember: true,
                            }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                            className="login-inner"
                            form={this.props.form}
                            >
                            <Form.Item
                                name="account"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                                ]}
                            >
                                <Input placeholder="Username" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                                ]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>

                            {this.state.isEnterCode && <Form.Item
                                label="Enter code was sent"
                                name="code"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input security code!',
                                },
                                ]}
                            >
                                <Input placeholder="Enter Code" />
                            </Form.Item>}

                            {this.state.isEnterCode && <Form.Item
                                label="Enter new password"
                                name="password"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input new password!',
                                },
                                ]}
                            >
                                <Input.Password placeholder="Enter New Password" />
                            </Form.Item>}

                            <Form.Item {...tailLayout}>
                                <Button type="danger" htmlType="submit" className="ant-btn-block">
                                {this.state.isEnterCode ? 'Reset Password' : 'Send Email'}
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button type="dashed" onClick={() => this.props.history.push('login')} className="ant-btn-block">
                                Login
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button type="dashed" onClick={() => this.props.history.push('register')} className="ant-btn-block">
                                Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Spin>
        );
    }
}

// export default Payment;
// const WrappedLogin = antdForm.create()(withRouter(Login));

const mapStateToProps = (state, ownProps) => ({
    account_forgot_pass: state.account.forgot_pass
});

const mapDispatchToProps = dispatch => {
  return {
    forgotPassword : (params) => {
        dispatch(EmailVerificationActions.forgotPassword(params));
    },
    resetStatusForgotPassword: () => {
        dispatch(EmailVerificationActions.resetStatusForgotPassword());
    }
  };
};

export default connect(
  mapStateToProps,mapDispatchToProps
)(withRouter(ForgotPassword));
