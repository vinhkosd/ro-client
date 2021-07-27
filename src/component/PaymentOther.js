// import './layout.css';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Spin, Input, Button, Select, InputNumber, Card  } from 'antd';
import { withRouter } from "react-router-dom";
import openNotification from '../constants/Notification';
import MSG from '../constants/messages';
import * as PaymentActions from '../actions/PaymentActions';
import * as AccountActions from '../actions/AccountActions';
import ReactHtmlParser from 'react-html-parser';

const {Option} = Select;

class Payment extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          loading: false,
          chargeConfigInfo: {}
      }
    }

    componentDidMount() {
        const accountInfo = JSON.parse(window.localStorage.getItem('account'));
        if(!accountInfo) {//user not login
            this.props.history.push('/login')
        }

        let chargeConfigInfo = {
            ...this.props.chargeConfigInfo,
            component_config: this.props.chargeConfigInfo.component_config ? JSON.parse(this.props.chargeConfigInfo.component_config) : [],
            list_component: this.props.chargeConfigInfo.component_config ? JSON.parse(this.props.chargeConfigInfo.list_component) : [],
        };
        this.setState({chargeConfigInfo});
        this.props.form.resetFields();
    }

    componentDidUpdate() {
        if(this.props.payment_info.status) {
            this.props.resetProcessPaypalStatus();
            if(this.props.payment_info.data[0] == 'error') {
                openNotification('error', this.props.payment_info.data[1]);
            } else if(this.props.payment_info.data.errors) {
                openNotification('error', MSG.validateErrors(this.props.payment_info.data));
            } else {
                this.props.changePage('choosemethod');
                openNotification('success', this.props.payment_info.data.success);
            }
            this.props.getAccountInfo();//reload money
            this.props.getLogs();
            this.props.form.resetFields();
        }
    }
    
    onFinish = (values) => {
        this.setState({
            loading: true
        }, () => {
            console.log(values);
            values.chargeId = this.state.chargeConfigInfo.id;
            this.props.paymentHoldCharge(values);
            this.setState({
                loading: false
            });
        });
        
    };
    
    onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };
    
    urlify = (text) => {
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, (url) => {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
      })
      // or alternatively
    }

    onChangeAmount = (e) => {
        const amount = e;
        const currency = this.props.form.getFieldValue('currency');
        const currentCurrency = this.props.list_currency && this.props.list_currency.data ? this.props.list_currency.data.find(item => item.id == currency) : null;
        const toUSD = parseFloat(amount / (currentCurrency.he_so_quy_doi ? currentCurrency.he_so_quy_doi : 1)).toFixed(2);
        
        this.props.form.setFieldsValue({
            tousd: toUSD
        });
    }
    onChangeCurrency = (e) => {
        const amount = this.props.form.getFieldValue('amount');
        const currency = e;
        const currentCurrency = this.props.list_currency && this.props.list_currency.data ? this.props.list_currency.data.find(item => item.id == currency) : null;
        const toUSD = parseFloat(amount / (currentCurrency.he_so_quy_doi ? currentCurrency.he_so_quy_doi : 1)).toFixed(2);
        
        this.props.form.setFieldsValue({
            tousd: toUSD
        });
    }
    
    render() {
        var paymentConfig = this.state.chargeConfigInfo ? this.state.chargeConfigInfo : [];
        const currentCurrency = this.props.list_currency && this.props.list_currency.data ? this.props.list_currency.data.find(item => item.default_region == this.props.chargeConfigInfo.region) : null;
        return (
            <div className="order">
                <div className="payment-type"><a href="/" className="router-link-active">Payment Type</a>: {this.state.chargeConfigInfo.charge_title} - {this.state.chargeConfigInfo.region} </div>
                <Spin size="large" spinning={this.state.loading}>
                
                <Form
                        name="basic"
                        initialValues={{
                            currency: currentCurrency ? currentCurrency.id : null,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        className=""
                        layout="vertical"
                        form={this.props.form}
                        >
                        {this.state.chargeConfigInfo.list_component && this.state.chargeConfigInfo.list_component.map(item => {
                            let nameItem = item.split('-')[0];
                            let indexItem = parseInt(item.split('-')[1], 10);
                            let configData = this.state.chargeConfigInfo.component_config[indexItem] ? this.state.chargeConfigInfo.component_config[indexItem] : [];
                            let componentItem = null;
                            let isRenderFormItem = true;
                            switch(nameItem) {
                                case "Input" :
                                    componentItem = <Input
                                            size="large" 
                                            disabled={configData.disabled && configData.disabled == "true" ? true : false}
                                            readonly={configData.readonly && configData.readonly == "true" ? true : false}
                                            placeholder={configData.placeholder ? configData.placeholder : ''}
                                            />
                                    break;
                                case "InputNumber":
                                    componentItem = <InputNumber
                                            //className="form-control"
                                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/\./g, '')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '').replace(/\./g, '')}
                                            style={{ width: '100%' }}
                                            size="large"
                                            disabled={configData.disabled && configData.required == "true" ? true : false}
                                            readonly={configData.readonly && configData.readonly == "true" ? true : false}
                                            placeholder={configData.placeholder ? configData.placeholder : ''}
                                        />;
                                    break;
                                case "InputMoney":
                                    componentItem = <InputNumber
                                            //className="form-control"
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/\./g, '')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '').replace(/\./g, '')}
                                            style={{ width: '100%' }}
                                            size="large"
                                            readonly={configData.readonly && configData.readonly == "true" ? true : false}
                                            disabled={configData.disabled && configData.required == "true" ? true : false}
                                            placeholder={configData.placeholder ? configData.placeholder : ''}
                                        />;
                                    break;
                                case "Select":
                                    componentItem = <Select size="large" readonly={configData.readonly && configData.readonly == "true" ? true : false} disabled={configData.disabled && configData.required == "true" ? true : false} placeholder={configData.placeholder ? configData.placeholder : ''}>
                                                        {(configData.option ? configData.option : '').split(',').map(item => <Option value={item} key={item}>{item}</Option>)}
                                                    </Select>;
                                    break;
                                case "Image":
                                    let marginImg = {
                                        display: 'flex'
                                    };
                                    switch(configData.align) {
                                        case "left":
                                            marginImg = {
                                                ...marginImg,
                                                marginLeft: '0px'
                                            };
                                        break;
                                        case "right":
                                            marginImg = {
                                                ...marginImg,
                                                marginRight: '0px'
                                            };
                                        break;
                                        default:
                                            marginImg = {
                                                ...marginImg,
                                                marginLeft: 'auto',
                                                marginRight: 'auto'
                                            };
                                        break;
                                    }
                                    componentItem = <Card title={configData.label} ><img style={marginImg} src={configData.placeholder} width="300px"/></Card>;
                                    isRenderFormItem = false;
                                    break;
                                case "InfoBox":
                                    componentItem = <Card title={configData.label} >{ReactHtmlParser(this.urlify(configData.placeholder))}</Card>;
                                    isRenderFormItem = false;
                                    break;
                            }
                            return isRenderFormItem ? <Form.Item
                                        label={configData.label ? configData.label : nameItem}
                                        name={item}
                                        rules={[
                                            {
                                                required: configData.required && configData.required == "true" ? true : false,
                                                message: `Please input ${configData.label ? configData.label : nameItem} !`,
                                            },
                                        ]}
                                    >
                                        {componentItem}
                                </Form.Item> : componentItem;

                        })}
                        <Form.Item
                            label="Choose Currency:"
                            name="currency"
                            rules={[
                                {
                                    required: true,
                                    message: `Please choose currency !`,
                                },
                            ]}
                        >
                            <Select size="large" onChange={this.onChangeCurrency} disabled readonly>
                            {this.props.list_currency.data.map(item => {
                                return <Option value={item.id}>{`${item.currency}`}</Option>
                            })}
                        </Select>
                        </Form.Item>
                        <Form.Item
                            label="Amount:"
                            name="amount"
                            rules={[
                                {
                                    required: true,
                                    message: `Please input amount !`,
                                },
                            ]}
                        >
                            <InputNumber
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/\./g, '')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '').replace(/\./g, '')}
                                style={{ width: '100%' }}
                                size="large"
                                placeholder={'Enter amount you want to recharge'}
                                onChange={this.onChangeAmount}
                            />
                        </Form.Item>
                        
                        <Form.Item
                            label="Equivalent to USD:"
                            name="tousd"
                        >
                            <InputNumber
                                formatter={value => `$ ${value}`}
                                parser={value => value.replace(/\$\s/g, '')}
                                style={{ width: '100%' }}
                                size="large"
                                placeholder={'Equivalent to USD'}
                                readonly
                                disabled
                            />
                        </Form.Item>
                        
                        
                        <Form.Item>
                                <Button type="danger" htmlType="submit" className="ant-btn-block">
                                Submit
                                </Button>
                            </Form.Item>

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
    payment_info: state.payment.info,
    list_currency: state.payment.list_currency
});

const mapDispatchToProps = dispatch => {
    return {
        paymentHoldCharge: (params) => {
            dispatch(PaymentActions.paymentHoldCharge(params));
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
