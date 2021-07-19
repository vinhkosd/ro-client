// import './layout.css';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Spin, Input, Button, Select, InputNumber } from 'antd';
import { withRouter } from "react-router-dom";
import openNotification from '../constants/Notification';
import MSG from '../constants/messages';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from '../constants/captchaEngine';
import * as PaymentActions from '../actions/PaymentActions';
import * as AccountActions from '../actions/AccountActions';

const {Option} = Select;

class Payment extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          loading: false,
          payAmount: 0,
      }
    }

    componentDidMount() {
        const accountInfo = JSON.parse(window.localStorage.getItem('account'));
        if(!accountInfo) {//user not login
            this.props.history.push('/login')
        }

        loadCaptchaEnginge(3);
        this.props.getPaypalConfig();
    }

    componentDidUpdate() {
        if(this.props.payment_config.status) {
            this.props.resetStatusPaypalConfig();
            const configData = this.props.payment_config.data;
            window.paypal.Button.render({
                // Configure environment
                env: configData.paypalEnv,
                client: {
                    sandbox: configData.paypalClientID,
                    production: configData.paypalClientID
                },
                // Customize button (optional)
                locale: 'en_US',
                style: {
                    size: 'large',
                    // color: 'gold',
                    shape: 'pill',
                },
                // Set up a payment
                payment: (data, actions) => {
                    return actions.payment.create({
                        transactions: [{
                            amount: {
                                total: this.props.form.getFieldValue('payAmount'),
                                currency: 'USD'
                            }
                        }]
                    });
                },
                // Execute the payment
                onAuthorize:  (data, actions) => {
                    return actions.payment.execute()
                    .then(() => {
                        this.processPaymentData(data);
                    });
                }
            }, '#paypal-button');
        }

        if(this.props.payment_info.status) {
            this.props.resetProcessPaypalStatus();
            if(this.props.payment_info.data[0] == 'error') {
                openNotification('error', MSG.payment[this.props.payment_info.data[1]]);
            } else if(this.props.payment_info.data.errors) {
                openNotification('error', MSG.validateErrors(this.props.payment_info.data));
            } else {
                openNotification('success', MSG.payment.success);
            }
            this.props.getAccountInfo();//reload money
            this.props.getLogs();
        }
    }

    processPaymentData = (data) => {
        var params = {
            paymentID: data.paymentID,
            token: data.paymentToken,
            payerID: data.payerID,
        };
        this.props.processPayment(params);
        this.props.form.resetFields();
    }

    onChangePayAmount = (e) => {
        this.setState({payAmount: e});
    }

    onChangeCaptcha = (e) => {
        this.setState({captcha: e});
    }

    render() {
        return (
            <div className="order">
                <div className="payment-type"><a href="/" className="router-link-active">Payment Type</a>: PayPal </div>
                <Spin size="large" spinning={this.state.loading}>
                
                <Form
                        name="basic"
                        initialValues={{
                            // remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        className=""
                        layout="vertical"
                        form={this.props.form}
                        >
                        <Form.Item
                            label="Pay Amount:"
                            name="payAmount"
                            rules={[
                            {
                                required: true,
                                message: 'Please input pay amount!',
                            },
                            ]}
                        >
                            <InputNumber
                                //className="form-control"
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/\./g, '')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '').replace(/\./g, '')}
                                style={{ width: '100%' }}
                                size="large"
                                onChange={this.onChangePayAmount}
                            />
                        </Form.Item>

                        <div style={{display: 'flex'}}>
                            <div className="ant-col ant-col-8">
                                <Form.Item
                                    name="captcha"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input captcha!',
                                    },
                                    ]}
                                >
                                    <Input size="large" placeholder="Captcha" onChange={this.onChangeCaptcha}/>
                                </Form.Item>
                            </div>
                            <div className="ant-col ant-col-4 p-col"><LoadCanvasTemplateNoReload /></div>
                        </div>
                        
                        <div id="paypal-button" style={{display: (!isNaN(this.props.form.getFieldValue('payAmount')) && this.props.form.getFieldValue('payAmount') > 0 && validateCaptcha(this.props.form.getFieldValue('captcha'), false))? 'block': 'none'}}></div>
                        <Button type="primary" onClick={() => this.props.changePage('choosemethod')} className="ant-btn-block">
                            Back
                        </Button>
                    </Form>
                </Spin>
            </div>
        );
    }
}

// export default Payment;
// const WrappedPayment = antdForm.create()(withRouter(Payment));

const mapStateToProps = (state, ownProps) => ({
    payment_config: state.payment.config,
    payment_info: state.payment.info
});

const mapDispatchToProps = dispatch => {
    return {
        processPayment: (params) => {
            dispatch(PaymentActions.processPayment(params));
        },
        getPaypalConfig: () => {
            dispatch(PaymentActions.getPaypalConfig());
        },
        resetStatusPaypalConfig: () => {
            dispatch(PaymentActions.resetStatusPaypalConfig());
        },
        resetProcessPaypalStatus: () => {
            dispatch(PaymentActions.resetProcessPaypalStatus());
        },
        getAccountInfo: () => {
            dispatch(AccountActions.getAccountInfo());
        },
        getLogs: () => {
            dispatch(AccountActions.getLogs());
        },
    };
};

export default connect(
  mapStateToProps,mapDispatchToProps
)(withRouter(Payment));
