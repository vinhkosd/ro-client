import './layout.css';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Spin, Typography  } from 'antd';
import * as EmailVerificationActions from '../actions/EmailVerificationActions';
import openNotification from '../constants/Notification';
import MSG from '../constants/messages';
import * as AccountActions from '../actions/AccountActions';

class ChangeEmail extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        isEnterCode: false,
      }
    }

    componentDidMount() {
        const accountInfo = JSON.parse(window.localStorage.getItem('account'));
        if(!accountInfo) {//user not login
            this.props.history.push('login')
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.account_change_email.status) {
            this.setState({loading: false});
            const changeEmailData = nextProps.account_change_email.data;
            if(changeEmailData[0] == 'error') {
                if(changeEmailData[1] == 'send_mail') {
                    this.setState({isEnterCode: true});
                    openNotification('warning', changeEmailData[2]);
                    openNotification('info', MSG.change_email.enter_code);
                } else {
                    openNotification('error', changeEmailData[1]);
                }
            } else {
                if(changeEmailData[1] == 'send_mail') {
                    this.setState({isEnterCode: true});
                    openNotification('success', MSG.change_email.enter_code);
                } else if(changeEmailData[1] == 'reset_email') {
                    openNotification('success', MSG.change_email.success);
                    this.props.getAccountInfo();
                    this.props.form.resetFields();
                    window.localStorage.setItem('account', JSON.stringify(changeEmailData[2]));
                } else {
                    openNotification('error', 'Cant handle change email module, please contact administrator');
                    this.props.form.resetFields();
                }
            }
            this.props.resetStatusChangeEmail();
        }
    }

    onFinish = (values) => {
        this.setState({
            loading: true
        }, () => {
            this.props.changeEmail(values);
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
                    <div className="header-text">Change Email </div>
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
                                name="email"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your current Email!',
                                },
                                ]}
                            >
                                <Input placeholder="Your current Email" />
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
                                label="Enter new Email"
                                name="new_email"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input new email!',
                                },
                                ]}
                            >
                                <Input placeholder="Enter New Email" />
                            </Form.Item>}

                            <Form.Item {...tailLayout}>
                                <Button type="danger" htmlType="submit" className="ant-btn-block">
                                {this.state.isEnterCode ? 'Change Email' : 'Send Email'}
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

const mapStateToProps = (state, ownProps) => ({
    account_change_email: state.account.change_email
});

const mapDispatchToProps = dispatch => {
  return {
    changeEmail : (params) => {
        dispatch(EmailVerificationActions.changeEmail(params));
    },
    resetStatusChangeEmail: () => {
        dispatch(EmailVerificationActions.resetStatusChangeEmail());
    },
    getAccountInfo: () => {
        dispatch(AccountActions.getAccountInfo());
    }
  };
};

export default connect(
  mapStateToProps,mapDispatchToProps
)(withRouter(ChangeEmail));
