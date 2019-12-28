import React from 'react';

import './Example.scss';
import Pizza from './../Pizza/Pizza';
import Button from './../UI/Button/Button';

const Example = props => (
	<div className="example">
		<h3 className="example__title">{props.name}</h3>
		<Pizza dimensions={{ width: '27rem', height: '27rem' }} smallIng={true} ingredients={props.ingredients} />
		<div className="example__button">
			<Button type="OrderActive" clicked={props.clicked}>
				Select
			</Button>
		</div>
	</div>
);

export default Example;
