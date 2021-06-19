import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import ErrorBoundary from './Error';
import Login from '../Login';
import Register from '../Register';
import Payment from '../Payment';
import Service from '../Service';
import Logout from '../Logout';
import ForgotPassword from '../ForgotPassword';
import componentWithFormHOC from '../../constants/componentWithFormHOC';

const Fragment = React.Fragment;

class Routing extends React.Component {
  isAtLoginPath = () => {
    const currentPath = this.props.location.pathname;
    let loginPath = ['/login','/login/', '/register','/register/','/forgotPassword','/forgotPassword/'];
    if (loginPath.indexOf(currentPath) !== -1) {
      return true;
    }
  }

  render(){
    const { match, } = this.props;
    
    let routing = <div></div>;
    const accountInfo = JSON.parse(window.localStorage.getItem('account'));
    
    routing = (
        <Switch>
          <ErrorBoundary>
            { (!this.isAtLoginPath()) && !accountInfo && <Redirect to={'login'}/> }
            { (this.isAtLoginPath()) && accountInfo && <Redirect to={'service'}/> }
            { (this.props.location.pathname == "/") && accountInfo && <Redirect to={'service'}/> }
            <Route path={`/login`} component={Login} />
            <Route path={`/register`} component={Register} />
            <Route path={`/service`} component={Service} />
            <Route path={`/logout`} component={Logout} />
            <Route path={`/forgotPassword`} component={componentWithFormHOC(ForgotPassword)} />
          </ErrorBoundary>
        </Switch>
      )
    
    return routing;
  }
}

export default withRouter(Routing);