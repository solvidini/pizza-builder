import React from "react";

import "./Backdrop.scss";

const Backdrop = props =>
  props.show ? (
    <div className="backdrop" onClick={props.clicked} style={props.zIndex ? {zIndex: props.zIndex} : {}}></div>
  ) : null;

export default Backdrop;
