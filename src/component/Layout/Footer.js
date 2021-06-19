import './layout.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Footer() {
  return (
    <React.Fragment>
      <div id="footer">
        <img src="img/foot-logo.png" className="logo"/>
        <div className="text">
          <p><a href="https://sea.ragnaroketernallove.com/terms-of-service" target="_blank"> Terms of services </a> | <a href="https://sea.ragnaroketernallove.com/privacy-policy" target="_blank"> Privacy Policy </a>
          </p>
          <p>© 2018 Gravity Co., Ltd. All Rights Reserved.</p>
          <p>© 2018 Gravity Interactive, Inc. All Rights Reserved.</p>
          <p>© 2018 X.D. Global Ltd. All Rights Reserved.</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Footer;
