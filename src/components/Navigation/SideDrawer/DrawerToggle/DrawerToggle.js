import React from 'react';

import './DrawerToggle.scss';

const DrawerToggle = props => {
	const iconClasses = ['drawer-toggle__icon'];
	if (props.sideDrawerIsVisible) {
		iconClasses.push('drawer-toggle__icon--active');
	}
	return (
		<div onClick={props.clicked} className="drawer-toggle__button">
			<div className={iconClasses.join(' ')}>&nbsp;</div>
		</div>
	);
};

export default DrawerToggle;
