import React from 'react';

import './Example.scss';
import Button from './../UI/Button/Button';

const Example = props => (
	<div className="example">
		<h3 className="example__title">{props.name}</h3>
		<div className="example__image"><img src={props.source} alt={props.name} /></div>
		<div className="example__button">
			<Button type="OrderActive" clicked={props.clicked}>
				Select
			</Button>
		</div>
	</div>
);

export default React.memo(Example);
