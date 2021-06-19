import './layout.css';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Spin  } from 'antd';
import openNotification from '../constants/Notification';
import MSG from '../constants/messages';
import * as AccountActions from '../actions/AccountActions';

class ChangePassword extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
      }
    }

    componentDidMount() {
        const accountInfo = JSON.parse(window.localStorage.getItem('account'));
        if(!accountInfo) {//user not login
            this.props.history.push('login')
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.account_change_password.status) {
            const changePassData = nextProps.account_change_password.data;
            if(changePassData[0] == 'error') {
                openNotification('error', MSG.change_password[changePassData[1]]);
            } else {
                window.localStorage.setItem('account', JSON.stringify(changePassData[1]));
                openNotification('success', MSG.change_password.success);
            }
            this.setState({
                loading: false
            });
            this.props.form.resetFields();
            this.props.resetChangePassword();
        }
    }

    onFinish = (values) => {
        this.setState({
            loading: true
        }, () => {
            this.props.changePassword(values);
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
                    <div className="header-text">Change Password </div>
                    <div className="login">
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
                                name="oldpassword"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Old Password!',
                                },
                                ]}
                            >
                                <Input.Password placeholder="Old Password" />
                            </Form.Item>

                            <Form.Item
                                name="newpassword"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input New Password!',
                                },
                                ]}
                            >
                                <Input.Password placeholder="New Password" />
                            </Form.Item>

                            <Form.Item
                                name="renewpassword"
                                dependencies={['newpassword']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please retype your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('newpassword') === value) {
                                        return Promise.resolve();
                                        }
                                        return Promise.reject('The two new passwords that you entered do not match!');
                                    },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Retype New Password" />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="danger" htmlType="submit" className="ant-btn-block">
                                    Change Password
                                </Button>
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="link" onClick={() => this.props.changePage('accountinfo')} className="ant-btn-block">
                                    Back
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
    account_change_password: state.account.change_password
});

const mapDispatchToProps = dispatch => {
  return {
    getAccountInfo: () => {
        dispatch(AccountActions.getAccountInfo());
    },
    changePassword: (params) => {
        dispatch(AccountActions.changePassword(params));
    },
    resetChangePassword: () => {
        dispatch(AccountActions.resetChangePassword());
    },
  };
};

export default connect(
  mapStateToProps,mapDispatchToProps
)(withRouter(ChangePassword));
