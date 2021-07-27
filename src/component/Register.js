import './layout.css';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Spin  } from 'antd';
import * as RegisterActions from '../actions/RegisterActions';
import openNotification from '../constants/Notification';
import MSG from '../constants/messages';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from '../constants/captchaEngine';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
      }
    }

    componentDidMount() {
        const accountInfo = JSON.parse(window.localStorage.getItem('account'));
        if(accountInfo) {//user has login
            this.props.history.push('service')
        }
        loadCaptchaEnginge(3);
    }

    componentWillReceiveProps(nextProps) {
        const registerStatus = nextProps.register_status;
        if(registerStatus.status) {
            if(registerStatus.data[0] == 'error') {
                openNotification('error', MSG.register[registerStatus.data[1]] ? MSG.register[registerStatus.data[1]] : registerStatus.data[1]);
            }  else if(registerStatus.data.errors) {
                openNotification('error', MSG.validateErrors(registerStatus.data));
            } else {
                openNotification('success', `Register account [${registerStatus.data[1].account}] success!`);
                window.localStorage.setItem('account', JSON.stringify(registerStatus.data[1]));
                this.props.history.push('service')
            }
            this.setState({ loading: false });
            this.props.registerResetStatus();
        }
    }

    onFinish = (values) => {
        if (validateCaptcha(values.captcha, false)==true) {
            this.setState({ loading: true }, () => {
                this.props.register(values);
            });
        } else {
            openNotification('error', MSG.register.wrong_captcha);
        }
    };
    
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const layout = {
            // labelCol: { span: 8 },
            // wrapperCol: { span: 16 },
        };
        const tailLayout = {
            // wrapperCol: { offset: 8, span: 16 },
        };

        const validateMessages = {
            required: '${name} is required!',
            types: {
              email: 'Please input a valid email!',
              number: '${name} is not a valid number!',
            },
            number: {
              range: '${name} must be between ${min} and ${max}',
            },
        };

        return (
            <Spin size="large" spinning={this.state.loading}>
                <div className="groups">
                    <div className="header-text">Member Register </div>
                    <div className="login">
                        <h4>Account register</h4>
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
                            validateMessages={validateMessages}
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
                                    type: 'email',
                                    required: true,
                                    // message: 'Please input your Email!',
                                },
                                ]}
                            >
                                <Input placeholder="Email" />
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

                            <Form.Item
                                name="repassword"
                                dependencies={['password']}
                                rules={[
                                {
                                    required: true,
                                    message: 'Please retype your password!',
                                },
                                ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                                }),
                                ]}
                            >
                                <Input.Password placeholder="Retype your Password" />
                            </Form.Item>
                            <div style={{display: 'flex'}}>
                                <div className="ant-col ant-col-16">
                            <Form.Item
                                name="captcha"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input captcha!',
                                },
                                ]}
                            >
                                <Input placeholder="Captcha" />
                            </Form.Item>
                                </div>
                                <div className="ant-col ant-col-8"><LoadCanvasTemplateNoReload /></div>
                            </div>
                            
                            <Form.Item {...tailLayout}>
                                <Button type="danger" htmlType="submit" className="ant-btn-block">
                                Register
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button type="dashed" onClick={() => this.props.history.push('login')} className="ant-btn-block">
                                Login
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

const mapStateToProps = (state, ownProps) => ({
    register_status: state.register.status
});

const mapDispatchToProps = dispatch => {
  return {
    register : (params) => {
        dispatch(RegisterActions.register(params));
    },
    registerResetStatus: () => {
        dispatch(RegisterActions.registerResetStatus());
    }
  };
};

export default connect(
  mapStateToProps,mapDispatchToProps
)(withRouter(Login));
