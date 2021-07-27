// import './layout.css';
import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Spin, Button } from 'antd';
import { withRouter } from "react-router-dom";
import Payment from './Payment';
import PaymentOther from './PaymentOther';
import WithFormHOC from '../constants/withFormHOC';
import * as PaymentActions from '../actions/PaymentActions';
import * as AccountActions from '../actions/AccountActions';

const { TabPane } = Tabs;

class PaymentMenu extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        activePage: 'choosemethod',
        activeSubPage: '',
        loading: true,
        chargeConfigInfo: [],
      }
    }

    componentDidMount() {
        const accountInfo = JSON.parse(window.localStorage.getItem('account'));
        if(!accountInfo) {//user not login
            this.props.history.push('login')
        }
        this.props.getChargeConfig();
        this.props.listCurrency();
    }
    
    componentDidUpdate() {
        if(this.props.payment_charge_config.status && this.props.list_currency.status) {
          this.props.resetStatusChargeConfig();
          this.props.resetStatusListCurrency();
          this.setState({loading: false})
        }
        
    }
    
    changePage = (activePage) => {
       this.setState({activePage})
    }
    
    changeSubPage = (activeSubPage) => {
       this.setState({activeSubPage})
    }

    render() {
      var chargeConfig = this.props.payment_charge_config && this.props.payment_charge_config.data ? this.props.payment_charge_config.data : [];
      return (
        <Spin size="large" spinning={this.state.loading}>
          {this.state.activePage == 'choosemethod' && <div className="groups">
    			  <div className="group">
      				<div className="title">Best recharging promotion recommended:</div>
      				<a className="banner" onClick={() => this.changePage('paypal')}>
      					<img src="img/paypal.png" className="logo"/><span className="text">PayPal</span>
      				</a>
      			</div>
      			<div className="group">
    				  <div className="title">Please choose the recharge in your country:</div>
    				  {this.state.activeSubPage == '' &&Object.keys(chargeConfig).map((item, key) => {
    				    return <a className="banner" onClick={() => {
    				      this.changeSubPage(item);
    				    }}>
      					<div className="logo" style={{ backgroundImage: `url(/img/${item ? item : "noimg"}.png)` }}></div><span className="text">{item}</span>
      				</a>;
    				  })}
    				  
    				  {Object.keys(chargeConfig).map(item => {
    				    return chargeConfig[item].map(itemSub => {
    				      return this.state.activeSubPage == itemSub.region && <a className="banner" onClick={() => {
        				      this.changePage(itemSub.charge_title);
        				      this.setState({chargeConfigInfo: itemSub})
        				    }}>
        				    <div className="logo" style={{ backgroundImage: `url(${itemSub.img ? itemSub.img : "img/noimg.png"})` }}></div>
          				  <span className="text">{itemSub.charge_title}</span>
          				</a>;
      				  });
    				  })}
    				  
              {this.state.activeSubPage != '' && <Button style={{marginTop: '24px', marginRight:'48px'}} type="primary" onClick={() => this.changeSubPage("")} className="ant-btn-block">
                            Back
                        </Button>}
      			</div>
      		</div>}
      		
      		{this.state.activePage == 'paypal' && 
      		  <WithFormHOC Component={Payment}  props={{...this.props, changePage: this.changePage }}/>
      		}
      		
      		{this.state.activePage != 'paypal' && this.state.activePage != 'choosemethod' && //chọn page khác
      		  <WithFormHOC Component={PaymentOther}  props={{...this.props, changePage: this.changePage, chargeConfigInfo:this.state.chargeConfigInfo}} />
      		}
        </Spin>
      );
    }
}

// export default Payment;
// const WrappedPayment = antdForm.create()(withRouter(Payment));

const mapStateToProps = (state, ownProps) => ({
    payment_charge_config: state.payment.charge_config,
    list_currency: state.payment.list_currency
});

const mapDispatchToProps = dispatch => {
    return {
        getChargeConfig: () => {
            dispatch(PaymentActions.getChargeConfig());
        },
        resetStatusChargeConfig: () => {
            dispatch(PaymentActions.resetStatusChargeConfig());
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
        listCurrency: () => {
            dispatch(PaymentActions.listCurrency());
        },
        resetStatusListCurrency: () => {
            dispatch(PaymentActions.resetStatusListCurrency());
        },
    };
};

export default connect(
  mapStateToProps,mapDispatchToProps
)(withRouter(PaymentMenu));
