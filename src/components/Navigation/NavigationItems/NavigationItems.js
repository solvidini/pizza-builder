import React from 'react';

import './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
    <ul className="navigation-items">
        <NavigationItem link="/" exact>Pizza&nbsp;Builder</NavigationItem>
        <NavigationItem link="/examples" exact>Examples</NavigationItem>
        {!props.isAuthenticated
            ? null
            : <NavigationItem link="/orders">Orders</NavigationItem>}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default NavigationItems;