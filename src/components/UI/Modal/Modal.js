import React, { Fragment } from 'react';

import './Modal.scss';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {
	return (
		<Fragment>
			<Backdrop show={props.show} clicked={props.modalClosed} zIndex={900}/>
			<div
				className="modal"
				style={{
					transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0',
				}}
			>
				{props.children}
			</div>
		</Fragment>
	);
};

export default React.memo(
	modal,
	(prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children
);
