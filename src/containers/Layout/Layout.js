import React, { useState, Fragment } from "react";
import { connect } from "react-redux";

import "./Layout.scss";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Fragment>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
        sideDrawerIsVisible={sideDrawerIsVisible}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        opened={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      /> 
      <main className="main-content">{props.children}</main>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
