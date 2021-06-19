import './layout.css';
import React from 'react';

function Header() {
  return (
    <React.Fragment>
      <a href="/" aria-current="page" className="router-link-exact-active router-link-active" id="header">
        <picture>
          <source media="(max-width: 850px)" srcSet="img/bg-banner-mobile.jpg"/>
          <source media="(min-width: 851px)" srcSet="img/bg-banner.jpg"/>
          <img src="img/bg-banner.jpg" alt="Ragnarok M Recharge Center"/>
        </picture>
      </a>
    </React.Fragment>
  );
}

export default Header;
