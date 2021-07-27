// import './layout.css';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Spin, Input, Button, Select } from 'antd';
import { withRouter } from "react-router-dom";
import openNotification from '../constants/Notification';
import MSG from '../constants/messages';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from '../constants/captchaEngine';
import * as AccountActions from '../actions/AccountActions';
import * as GiftCodeActions from '../actions/GiftCodeActions';


const {Option} = Select;

class GiftCode extends React.Component {
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
    }

    onFinish = (values) => {
        this.setState({
            loading: true
        }, () => {
            this.props.checkCode(values);
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

    onChangeZoneID = (zoneid) => {
        const zoneData = this.props.account_zone.data;
        this.setState({zoneInfo: zoneData.find(item => item.zoneid == zoneid)});
        this.props.form.setFieldsValue({
            charid: null
        });
    }

    componentDidUpdate(){
        const zoneData = this.props.account_zone;
        const charData = this.props.account_char;
        if(this.state.loading && zoneData.status && charData.status) {
            this.setState({
                loading: false
            });
            this.props.resetStatusAllList();
            this.props.form.resetFields();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.check_code.status) {
            let statusCode = nextProps.check_code.data[0];
            this.setState({
                loading: false
            }, () => {
                if(statusCode == 'success') {
                    openNotification('success', 'Receive GiftCode success! Please check in-game mail.');
                }   else if(nextProps.check_code.data.errors) {
                    openNotification('error', MSG.validateErrors(nextProps.check_code.data));
                }  else {
                    openNotification('error', nextProps.check_code.data[1]);
                }
                this.props.getAccountInfo();//reload money
                this.props.getLogs();
                this.props.resetCheckCodeStatus();
                this.props.form.resetFields();
            });
        }
    }

    render() {
        const zoneData = this.props.account_zone;
        const charData = this.props.account_char;

        return (
            <div className="order">
                <div className="payment-type"> GiftCode </div>
                <Spin size="large" spinning={this.state.loading}>
                
                <Form
                    name="basic"
                    initialValues={{
                        // remember: true,
                        serverid: zoneData.data && Object.keys(zoneData.data).length > 0 ? zoneData.data[0].regionid : null
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
                            {zoneData.data.map(item => <Option value={item.regionid} key={`${item.regionid}-${item.zonename}`}>{item.nickname}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Choose Character:"
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
                                if(true) {
                                    return <Option value={item.charid}>{`${item.name}`}</Option>
                                }
                            })}
                        </Select>
                    </Form.Item>
                    
                    <Form.Item
                        label="GiftCode:"
                        name="code"
                        rules={[
                        {
                            required: true,
                            message: 'Please input code!',
                        },
                        ]}
                    >
                         <Input size="large" placeholder="Enter GiftCode" />
                    </Form.Item>

                    
                    <Form.Item>
                        <Button type="danger" htmlType="submit" className="ant-btn-block">
                            Submit
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
    check_code: state.giftcode.check_code,
});

const mapDispatchToProps = dispatch => {
  return {
    getZoneList: () => {
        dispatch(AccountActions.getZoneList());
    },
    getCharList: () => {
        dispatch(AccountActions.getCharList());
    },
    checkCode: (params) => {
        dispatch(GiftCodeActions.checkCode(params));
    },
    resetCheckCodeStatus: () => {
        dispatch(GiftCodeActions.resetCheckCodeStatus());
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
)(withRouter(GiftCode));
