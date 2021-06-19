// import './layout.css';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Tabs } from 'antd';
import { withRouter } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';
import Payment from './Payment';
import AccountInfo from './AccountInfo';
import BuyPackage from './BuyPackage';
import AccountLogs from './AccountLogs';
import WithFormHOC from '../constants/withFormHOC';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

const { TabPane } = Tabs;

class Service extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        activeKey: 'accountinfo'
      }
    }

    componentDidMount() {
        const accountInfo = JSON.parse(window.localStorage.getItem('account'));
        if(!accountInfo) {//user not login
            this.props.history.push('login')
        }
    }

    changeTabs = (activeKey) => {
        console.log(activeKey);
        this.setState({activeKey});
    }

    render() {
        return (
            <div className="groups">
                <Tabs activeKey={this.state.activeKey} className="user-tabs" defaultActiveKey="1" onChange={this.changeTabs} centered>
                    <TabPane tab="Account Info" key="accountinfo">
                        <AccountInfo changeTabs={this.changeTabs}/>
                    </TabPane>
                    <TabPane tab="Payment" key="payment">
                        <WithFormHOC Component={Payment} props={this.props}/>
                    </TabPane>
                    <TabPane tab="Buy Package" key="buypackage">
                        <WithFormHOC Component={BuyPackage} props={this.props}/>
                    </TabPane>
                    <TabPane tab="Account Logs" key="accountlogs">
                        <AccountLogs/>
                    </TabPane>
                </Tabs>
                
            </div>
        );
    }
}

// export default Payment;
// const WrappedPayment = antdForm.create()(withRouter(Payment));

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,mapDispatchToProps
)(withRouter(Service));
