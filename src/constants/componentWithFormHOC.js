import React from 'react';
import { connect } from 'react-redux';
import WithFormHOC from './withFormHOC';
/*global localStorage*/
const componentWithFormHOC = (WrappedComponent, props = {})  => {
  class WithComponentWithFormHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    
    componentDidMount () {
      
    }
    
    componentDidUpdate() {
 
    }
    
    render() {
        return <WithFormHOC Component={WrappedComponent} props={this.props}/>
    }
  }
  
  return connect(null, null)(WithComponentWithFormHOC);
};

export default componentWithFormHOC;