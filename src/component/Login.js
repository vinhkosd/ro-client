import './layout.css';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Spin, Typography  } from 'antd';
import * as LoginActions from '../actions/LoginActions';
import openNotification from '../constants/Notification';
import MSG from '../constants/messages';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false
      }
    }

    componentDidMount() {
        const accountInfo = JSON.parse(window.localStorage.getItem('account'));
        if(accountInfo) {//user has login
            this.props.history.push('service')
        }
    }

    componentWillReceiveProps(nextProps) {
        const loginStatus = nextProps.login_status;
        if(loginStatus.status) {
            if(loginStatus.data[0] == 'error') {
                openNotification('error', MSG.login[loginStatus.data[1]]);
            } else if(loginStatus.data.errors) {
                openNotification('error', MSG.validateErrors(loginStatus.data));
            } else {
                openNotification('success', MSG.login.success);
                window.localStorage.setItem('account', JSON.stringify(loginStatus.data));
                this.props.history.push('service')
            }
            this.setState({
                loading: false
            });
            this.props.loginResetStatus();
        }
    }

    onFinish = (values) => {
        this.setState({
            loading: true
        }, () => {
            this.props.login(values);
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
                    <div className="header-text">Member Login </div>
                    <div className="login">
                        <h4>Login to your account</h4>
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
                                <Input placeholder="Username/Email" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                ]}
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="danger" htmlType="submit" className="ant-btn-block">
                                Login
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button type="dashed" onClick={() => this.props.history.push('register')} className="ant-btn-block">
                                Register
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button type="link" onClick={() => this.props.history.push('forgotPassword')} className="ant-btn-block">
                                Forgot password?
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
    login_status: state.login.status
});

const mapDispatchToProps = dispatch => {
  return {
    login : (params) => {
        dispatch(LoginActions.login(params));
    },
    loginResetStatus: () => {
        dispatch(LoginActions.loginResetStatus());
    }
  };
};

export default connect(
  mapStateToProps,mapDispatchToProps
)(withRouter(Login));
