import React from 'react';

import classes from './Order.module.scss';

const Order = props => {
	const ingredients = [];

	for (let ingredientName in props.ingredients) {
		if (props.ingredients[ingredientName] > 0) {
			ingredients.push({
				name: ingredientName,
				amount: props.ingredients[ingredientName],
			});
		}
	}

	const ingredientsOutput = ingredients.map(ig => {
		return (
			<span className={classes.Ingredients__item} key={ig.name}>
				{ig.name} ({ig.amount})
			</span>
		);
	});
	const date = new Date(props.date);
	const fullDate =
	date.getDate() +
	'-' +
	date.getMonth() +
	'-' +
	date.getFullYear() +
	' ' +
		date.getHours() +
		':' +
		(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
	return (
		<div className={classes.Order}>
			<p className={classes.Order__paragraph}>
				Date: <strong>{fullDate}</strong>
			</p>
			<p className={classes.Order__paragraph}>Ingredients:</p>
			<div className={classes.Ingredients}>{ingredientsOutput}</div>
			<p className={classes.Order__paragraph}>
				Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default Order;
