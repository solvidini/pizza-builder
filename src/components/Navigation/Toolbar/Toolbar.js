import React from 'react';

import './Toolbar.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = props => {
	const toolbarClasses = ["toolbar"];
	if (props.sideDrawerIsVisible) toolbarClasses.push("toolbar--transparent");
	return (
		<header className={toolbarClasses.join(" ")}>
			<div className="toolbar__logo">
				<p>Pizza</p> <Logo /> <p>Builder</p>
			</div>
			<DrawerToggle sideDrawerIsVisible={props.sideDrawerIsVisible} clicked={props.drawerToggleClicked} />
			<nav className="toolbar__navigation">
				<NavigationItems isAuthenticated={props.isAuth} />
			</nav>
		</header>
	);
	
}


export default Toolbar;
