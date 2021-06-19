import './layout.css';
import React from 'react';
import AppRouting from '../Route/';

import { Layout } from 'antd';
const { Content } = Layout;

function Body(props) {
  return (
    <Content id='app-content'>
        <AppRouting history={props.history} />
    </Content>
  );
}

export default Body;
