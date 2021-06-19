import './account.css';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Spin, Tabs, Table } from 'antd';
import { withRouter } from "react-router-dom";
import openNotification from '../constants/Notification';
import MSG from '../constants/messages';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from '../constants/captchaEngine';
import * as AccountActions from '../actions/AccountActions';
import moment from 'moment';

const { TabPane } = Tabs;
const TimeFormat = 'DD/MM/YYYY HH:mm:ss';

class AccountInfo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          loading:true,
          dataPayment: [],
          dataBuyPackage: []
      }
    }
      
    columnsPayment = [
        {
            title: 'Index',
            dataIndex: 'stt',
            key: 'stt',
            render: (text, record, index) => {
                return index + 1;
            }
        },
        {
          title: 'Title',
          dataIndex: 'log_title',
          key: 'log_title',
        },
        {
          title: 'Content',
          dataIndex: 'log_content',
          key: 'log_content',
        },
        {
            title: 'Time',
            dataIndex: 'log_time',
            key: 'log_time',
            render: (text, record, index) => {
                return record.log_time ? moment(record.log_time).format(TimeFormat) : '';
            }
        },
    ];

    columnsBuyPackage = [
        {
            title: 'Index',
            dataIndex: 'stt',
            key: 'stt',
            render: (text, record, index) => {
                return index + 1;
            },
            // width: 80,
        },
        {
            title: 'Title',
            dataIndex: 'log_title',
            key: 'log_title',
            // width: 150,
          },
          {
            title: 'Content',
            dataIndex: 'log_content',
            key: 'log_content',
            // width: 450,
          },
          {
            title: 'Time',
            dataIndex: 'log_time',
            key: 'log_time',
            render: (text, record, index) => {
                return record.log_time ? moment(record.log_time).format(TimeFormat) : '';
            },
            // width: 150,
          },
          {
            title: 'Character ID',
            dataIndex: 'charid',
            key: 'charid',
            // width: 100,
          },
          {
            title: 'Zone ID',
            dataIndex: 'zoneid',
            key: 'zoneid',
            // width: 100,
          },
    ];

    componentDidMount() {
        const accountInfo = JSON.parse(window.localStorage.getItem('account'));
        if(!accountInfo) {//user not login
            this.props.history.push('login')
        }
        this.props.getLogs();
    }

    componentDidUpdate() {
        if(this.props.account_logs.status) {
            let dataSource = this.props.account_logs.data;
            let dataPayment = dataSource.filter(item => item.type == 'payment');
            let dataBuyPackage = dataSource.filter(item => item.type == 'buy_package');
            this.setState({loading: false, dataBuyPackage, dataPayment});
            this.props.resetStatusGetLogs();
        }
    }

    render() {
        
        return (
            <div className="order">
                <Spin size="large" spinning={this.state.loading}>
                    <Tabs className="user-tabs" defaultActiveKey="1" onChange={this.callback} centered>
                        <TabPane tab="Payment" key="1">
                            <Table dataSource={this.state.dataPayment} columns={this.columnsPayment} />
                        </TabPane>
                        <TabPane tab="Buy Package" key="2">
                            <Table dataSource={this.state.dataBuyPackage} columns={this.columnsBuyPackage} /*scroll={{ x: 1030, y: 300 }}*/ />
                        </TabPane>
                    </Tabs>
                </Spin>
            </div>
        );
    }
}

// export default Payment;
// const WrappedPayment = antdForm.create()(withRouter(Payment));

const mapStateToProps = (state, ownProps) => ({
    account_logs: state.account.logs
});

const mapDispatchToProps = dispatch => {
    return {
        getLogs: () => {
            dispatch(AccountActions.getLogs());
        },
        resetStatusGetLogs: () => {
            dispatch(AccountActions.resetStatusGetLogs());
        },
    };
};

export default connect(
  mapStateToProps,mapDispatchToProps
)(withRouter(AccountInfo));
