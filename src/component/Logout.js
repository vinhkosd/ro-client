import './layout.css';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Spin  } from 'antd';
import * as LoginActions from '../actions/LoginActions';
import openNotification from '../constants/Notification';
import MSG from '../constants/messages';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false
      }
    }

    componentDidMount() {
        window.localStorage.setItem('account', null)
        this.props.history.push('login')
    }

    render() {
        return (
            <Spin size="large" spinning={true}>
                <div className="groups">
                    <div className="header-text">Member Logout </div>
                </div>
            </Spin>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  mapStateToProps,mapDispatchToProps
)(withRouter(Login));
