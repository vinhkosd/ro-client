import './layout.css';
import React from 'react';
import APPCONFIG from '../../constants/appConfig';
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
        <a target="_blank" href={APPCONFIG.privacyPolicyUrl}>
          <img src="img/foot-logo.png" className="logo"/>
        </a>
        <div className="text">
          <p><a href="#"> Terms of services </a> | <a target="_blank" href={APPCONFIG.privacyPolicyUrl}> Privacy Policy </a>
          </p>
          <p>© 2021 Ragnarok Trinity Mobile</p>
          <p>© 2021 The new age of Ragnarok Mobile</p>
          <p>© 2021 GBTEAM.</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Footer;
