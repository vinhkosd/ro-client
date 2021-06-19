import './App.css';
import React from 'react';

import Header from './component/Layout/Header';
import Body from './component/Layout/Body';
import Footer from './component/Layout/Footer';

function App(props) {
  return (
    <React.Fragment>
      <Header/>
      <Body history={props.history}/>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
