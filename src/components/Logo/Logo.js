import React from 'react';

import pizzaLogo from '../../assets/images/pizza-logo.png';
import './Logo.scss';

const logo = (props) => (
    <div className="logo" style={{height: props.height}}>
        <img src={pizzaLogo} alt="Pizza Builder Logo" />
    </div>
);

export default logo;