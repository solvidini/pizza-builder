import React, { Fragment } from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';

const SideDrawer = props => {
	let sideDrawerClasses = ['side-drawer', 'side-drawer--closed'];
	if (props.opened) {
		sideDrawerClasses = ['side-drawer', 'side-drawer--opened'];
	}
	return (
		<Fragment>
			<Backdrop show={props.opened} clicked={props.closed} />
			<div className={sideDrawerClasses.join(' ')} onClick={props.closed}>
				<div className="side-drawer__logo">
					<p>P</p><Logo /><p>B</p>
				</div>
				<nav className="side-drawer__nav">
					<NavigationItems isAuthenticated={props.isAuth}/>
				</nav>
			</div>
		</Fragment>
	);
};

export default SideDrawer;
