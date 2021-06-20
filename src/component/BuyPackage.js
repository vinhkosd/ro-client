// import './layout.css';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Spin, Input, Button, Select } from 'antd';
import { withRouter } from "react-router-dom";
import openNotification from '../constants/Notification';
import MSG from '../constants/messages';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from '../constants/captchaEngine';
import * as AccountActions from '../actions/AccountActions';

const {Option} = Select;

class BuyPackage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          loading: true,
          currency: null,
          zoneInfo: []
      }
    }

    componentDidMount() {
        const accountInfo = JSON.parse(window.localStorage.getItem('account'));
        if(!accountInfo) {//user not login
            this.props.history.push('login')
        }

        this.props.getZoneList();
        this.props.getCharList();
        this.props.getDepositList();
        this.props.getTypeDepositList();
    }

    onFinish = (values) => {
        this.setState({
            loading: true
        }, () => {
            this.props.buyPackage(values);
        });
    };
    
    onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    onChangeCurrency = (currency) => {
        this.setState({currency});
        this.props.form.setFieldsValue({
            amount: null
        });
    }

    onChangeZoneID = (regionid) => {
        const zoneData = this.props.account_zone.data;
        this.setState({zoneInfo: zoneData.find(item => item.regionid == regionid)});
        this.props.form.setFieldsValue({
            charid: null
        });
    }

    componentDidUpdate(){
        const zoneData = this.props.account_zone;
        const charData = this.props.account_char;
        const depositData = this.props.account_deposit;
        const depositTypeData = this.props.account_deposit_type;
        if(this.state.loading && zoneData.status && charData.status && depositData.status && depositTypeData.status) {
            this.setState({
                loading: false
            });
            this.props.resetStatusAllList();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.account_buy_package.status) {
            let statusCode = nextProps.account_buy_package.data[0];
            this.setState({
                loading: false
            }, () => {
                if(statusCode == 'success') {
                    openNotification('success', 'Buy Package Success! Please check in-game mail.');
                } else {
                    openNotification('error', nextProps.account_buy_package.data[1]);
                }
                this.props.getAccountInfo();//reload money
                this.props.getLogs();
                this.props.resetBuyPackageStatus();
                this.props.form.resetFields();
            });
        }
    }

    render() {
        const zoneData = this.props.account_zone;
        const charData = this.props.account_char;
        const depositData = this.props.account_deposit;
        const depositTypeData = this.props.account_deposit_type;

        return (
            <div className="order">
                <div className="payment-type"> Buy Package </div>
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
                        label="Choose a server:"
                        name="serverid"
                        rules={[
                        {
                            required: true,
                            message: 'Please choose a server!',
                        },
                        ]}
                    >
                        <Select size="large" onChange={this.onChangeZoneID}>
                            {zoneData.data.map(item => <Option value={item.regionid}>{item.nickname} - {item.zonename}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Select in-game currency:"
                        name="currency"
                        rules={[
                        {
                            required: true,
                            message: 'Please choose in-game currency!',
                        },
                        ]}
                    >
                        <Select size="large" onChange={this.onChangeCurrency}>
                            {depositTypeData.data.map(item => <Option value={item.Type}>{item.Title}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Character ID:"
                        name="charid"
                        rules={[
                        {
                            required: true,
                            message: 'Please choose your Character ID!',
                        },
                        ]}
                    >
                        <Select size="large" >
                            {charData.data.map(item => {
                                if(item.zoneid === this.state.zoneInfo.zoneid) {
                                    return <Option value={item.charid}>{`${item.name} [ID: ${item.charid}]`}</Option>
                                }
                            })}
                        </Select>
                    </Form.Item>
                    
                    <Form.Item
                        label="Amount:"
                        name="amount"
                        rules={[
                        {
                            required: true,
                            message: 'Please choose amount!',
                        },
                        ]}
                    >
                        <Select size="large" >
                            {depositData.data.map(item => {
                                if((item.Type==4 ? 3 : item.Type) == this.state.currency) {
                                    return <Option value={item.id}>{`${item.Price} USD ${item.Title}`}</Option>;
                                }
                            })}
                        </Select>
                    </Form.Item>

                    
                    <Form.Item>
                        <Button type="danger" htmlType="submit" className="ant-btn-block">
                            Buy Package
                        </Button>
                    </Form.Item>
                </Form>
                </Spin>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    account_char: state.account.char,
    account_zone: state.account.zone,
    account_deposit: state.account.deposit,
    account_deposit_type: state.account.deposit_type,
    account_buy_package: state.account.buy_package,
});

const mapDispatchToProps = dispatch => {
  return {
    getZoneList: () => {
        dispatch(AccountActions.getZoneList());
    },
    getCharList: () => {
        dispatch(AccountActions.getCharList());
    },
    getDepositList: () => {
        dispatch(AccountActions.getDepositList());
    },
    getTypeDepositList: () => {
        dispatch(AccountActions.getTypeDepositList());
    },
    buyPackage: (params) => {
        dispatch(AccountActions.buyPackage(params));
    },
    resetBuyPackageStatus: () => {
        dispatch(AccountActions.resetBuyPackageStatus());
    },
    getAccountInfo: () => {
        dispatch(AccountActions.getAccountInfo());
    },
    resetStatusAllList: () => {
        dispatch(AccountActions.resetStatusAllList());
    },
    getLogs: () => {
        dispatch(AccountActions.getLogs());
    },
  };
};

export default connect(
  mapStateToProps,mapDispatchToProps
)(withRouter(BuyPackage));
