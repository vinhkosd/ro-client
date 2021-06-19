import './account.css';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Spin, Input, Button, Select, InputNumber } from 'antd';
import { withRouter } from "react-router-dom";
import openNotification from '../constants/Notification';
import MSG from '../constants/messages';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from '../constants/captchaEngine';
import * as AccountActions from '../actions/AccountActions';
import WithFormHOC from '../constants/withFormHOC';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

const {Option} = Select;

class AccountInfo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          loading: true,
          activePage: 'accountinfo'
      }
    }

    componentDidMount() {
        const accountInfo = JSON.parse(window.localStorage.getItem('account'));
        if(!accountInfo) {//user not login
            this.props.history.push('login')
        }
        this.props.getAccountInfo();
    }

    componentDidUpdate() {
        if(this.props.account_info.status) {
            this.setState({loading: false});
            this.props.resetStatusAccountInfo();
        }
    }

    changePage = (activePage) => {
        /*
            accountinfo
            changeemail
            changepassword
        */
       this.setState({activePage})
    }

    render() {
        const account_data = this.props.account_info.data ? this.props.account_info.data : [];
        
        return (
            <div className="order">
                <Spin size="large" spinning={this.state.loading}>
                    {this.state.activePage == 'accountinfo' && <div className="card">
                        <div className="card-body">
                            <div className="p-1">

                                <div className="col-md-12 col-xs-12">
                                    <div className="row">
                                        <form id="userform" className="col-md-12 col-xs-12">
                                            
                                            <div className="form-group basic animated">
                                                <div className="input-wrapper">
                                                    <div className="row">
                                                        <div className="col-md-3 col-xs-12">Account ID</div>
                                                        <div className="col-md-9 col-xs-12">
                                                            <Input value={account_data.id? account_data.id : ''} className="form-control" disabled={true}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group basic animated">
                                                <div className="input-wrapper">
                                                    <div className="row">
                                                        <div className="col-md-3 col-xs-12">Account Name</div>
                                                        <div className="col-md-9 col-xs-12">
                                                            <Input value={account_data.account? account_data.account : ''} className="form-control" disabled={true}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group basic animated">
                                                <div className="input-wrapper">
                                                    <div className="row">
                                                        <div className="col-md-3 col-xs-12">Email</div>
                                                        <div className="col-md-7 col-xs-12">
                                                            <Input value={account_data.email? account_data.email : ''} className="form-control" disabled={true}/>
                                                        </div>
                                                        <div className="col-md-2 col-xs-12 button-border-bottom">
                                                            <Button onClick={() => this.changePage('changeemail')} type="link" className="ant-btn-block">Change</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group basic animated">
                                                <div className="input-wrapper">
                                                    <div className="row">
                                                        <div className="col-md-3 col-xs-12">Amount</div>
                                                        <div className="col-md-7 col-xs-12">
                                                        <InputNumber
                                                            className="form-control"
                                                            formatter={value => `${value}.00 USD`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                            disabled={true}
                                                            style={{ width: '100%' }}
                                                            size="large"
                                                            value={`${(account_data.money || account_data.money == 0)? account_data.money : 0}`}
                                                        />
                                                        </div>
                                                        <div className="col-md-2 col-xs-12 button-border-bottom">
                                                            <Button onClick={() => {this.props.changeTabs('payment')}} type="link" className="ant-btn-block">Add funds</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group basic animated">
                                                <div className="input-wrapper">
                                                    <div className="row">
                                                        <div className="col-md-3 col-xs-12">Register Time</div>
                                                        <div className="col-md-9 col-xs-12">
                                                            <Input value={`${account_data.regtime? account_data.regtime : ''}`} className="form-control" disabled={true}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group basic animated">
                                                <div className="input-wrapper">
                                                    <div className="row">
                                                        <div className="col-md-3 col-xs-12">Password</div>
                                                        <div className="col-md-7 col-xs-12">
                                                            <Input value={`******`} className="form-control" disabled={true}/>
                                                        </div>
                                                        <div className="col-md-2 col-xs-12 button-border-bottom">
                                                            <Button onClick={() => this.changePage('changepassword')} type="link" className="ant-btn-block">Change</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Form.Item>
                                                <Button type="danger" className="ant-btn-block" onClick={() => {this.props.history.push('logout')}}>
                                                    Logout
                                                </Button>
                                            </Form.Item>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>}

                    {this.state.activePage == 'changeemail' && <WithFormHOC Component={ChangeEmail} props={
                            {
                                ...this.props,
                                changePage: this.changePage
                            }
                        }
                    />}
                    {this.state.activePage == 'changepassword' && <WithFormHOC Component={ChangePassword} props={
                            {
                                ...this.props,
                                changePage: this.changePage
                            }
                        }
                    />}
                </Spin>
            </div>
        );
    }
}

// export default Payment;
// const WrappedPayment = antdForm.create()(withRouter(Payment));

const mapStateToProps = (state, ownProps) => ({
    account_info: state.account.info
});

const mapDispatchToProps = dispatch => {
  return {
    getAccountInfo: () => {
        dispatch(AccountActions.getAccountInfo());
    },
    resetStatusAccountInfo: () => {
        dispatch(AccountActions.resetStatusAccountInfo());
    },
  };
};

export default connect(
  mapStateToProps,mapDispatchToProps
)(withRouter(AccountInfo));
