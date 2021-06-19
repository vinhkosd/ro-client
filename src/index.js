import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux"
// import { BrowserRouter, Route } from "react-router-dom";
// import store from "./store";
import configureStore, { history } from './store/configureStore';
import APPCONFIG from './constants/appConfig';

const store = configureStore();

ReactDOM.render(
  <BrowserRouter basename={APPCONFIG.baseName}>
    <Provider store={store}>
      <App history={history} store={store}/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
