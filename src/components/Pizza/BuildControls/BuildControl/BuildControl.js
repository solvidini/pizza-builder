import React from 'react';
import './BuildControl.scss';
import Button from './../../../UI/Button/Button';

const BuildControl = props => (
	<div className="build-control">
		<div className="build-control__label">
			{props.label}
			<img src={props.source} alt={props.label} />
		</div>
		<Button type="Danger" clicked={props.removed} disabled={props.disabledLess}>
			Less
		</Button>
		<Button type="Success" clicked={props.added} disabled={props.disabledMore}>
			More
		</Button>
	</div>
);

export default BuildControl;
