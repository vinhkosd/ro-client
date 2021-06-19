import React from 'react';
import Page500 from './Error500' 
// import * as Sentry from '@sentry/browser';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: null, errorInfo: null, eventId: null};
  }
  
  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    this.setState({
      error: error,
      errorInfo: info,
    });
    
    // Sentry.withScope(scope => {
    //   scope.setExtras(info);
    //   const eventId = Sentry.captureException(error);
    //   this.setState({eventId})
    // });
  }

  render() {
    return this.state.errorInfo ? <Page500 /> : this.props.children
  }
}

export default ErrorBoundary;