import React from 'react';

import classes from './Button.module.scss';

const Button = (props) => (
    <button
    disabled={props.disabled}
    className={[classes['Btn'], classes[props.type]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default Button;