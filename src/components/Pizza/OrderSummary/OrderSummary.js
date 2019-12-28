import React from 'react';

import Button from '../../UI/Button/Button';
import './OrderSummary.scss';

const orderSummary = props => {
	const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
		if (props.ingredients[igKey]) {
			return (
				<li key={igKey}>
					<span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
				</li>
			);
		}
		return false;
	});

	return (
		<div className="order-summary">
			<h3 className="order-summary__title">Your Order</h3>
			<p className="order-summary__paragraph">A delicious burger with the following ingredients:</p>
			<ul>{ingredientsSummary}</ul>
			<p className="order-summary__paragraph">
				<strong>Total Price: {props.price.toFixed(2)}</strong>
			</p>
			<div className="order-summary__checkout">
				<p className="order-summary__paragraph">Continue to Checkout?</p>
				<Button type="Danger" clicked={props.purchaseCancelled}>
					CANCEL
				</Button>
				<Button type="Success" clicked={props.purchaseContinued}>
					CONTINUE
				</Button>
			</div>
		</div>
	);
};

export default orderSummary;
