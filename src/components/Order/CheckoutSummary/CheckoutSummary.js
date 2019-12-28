import React from 'react';

import Pizza from '../../Pizza/Pizza';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.scss';

const CheckoutSummary = props => {
	return (
		<div className="checkout-summary">
			<h1 className="checkout-summary__title">We hope your pizza will taste delicious!</h1>
			<div className="checkout-summary__pizza">
				<Pizza ingredients={props.ingredients} />
			</div>
			<Button  clicked={props.checkoutCancelled}>
				CANCEL
			</Button>
			<Button  clicked={props.checkoutContinued}>
				CONTINUE
			</Button>
		</div>
	);
};

export default CheckoutSummary;
