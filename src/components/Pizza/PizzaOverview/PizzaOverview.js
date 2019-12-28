import React from 'react';
import './PizzaOverview.scss';
import Button from './../../UI/Button/Button';

const PizzaOverview = props => (
	<div className="pizza-overview">
		<p className="pizza-overview__price">
			Current Price: <strong>{props.price.toFixed(2)} $</strong>
		</p>
		<div className="pizza-overview__container">{props.children}</div>
		<div className="center">
			<Button type="Reset" disabled={!props.purchasable} clicked={props.reset}>
				RESET
			</Button>
			<Button
				type={!props.purchasable ? 'Order' : 'OrderActive'}
				disabled={!props.purchasable}
				clicked={props.ordered}
			>
				ORDER NOW
			</Button>
		</div>
	</div>
);

export default PizzaOverview;
