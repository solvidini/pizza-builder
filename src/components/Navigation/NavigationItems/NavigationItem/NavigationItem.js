import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.scss';

const NavigationItem = props => (
	<li className="navigation-item">
		<NavLink
			to={props.link}
			exact={props.exact}
			className="navigation-item__link"
			activeClassName="navigation-item__link--active"
		>
			{props.children}
		</NavLink>
	</li>
);

export default NavigationItem;
