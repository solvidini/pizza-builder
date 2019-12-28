import React from 'react';

import './Pizza.scss';

import PizzaIngredient from './PizzaIngredient/PizzaIngredient';

const Pizza = props => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map(igKey => {
			//POSITION ALGORITHM
			let positionY = 420;
			let positionX = 90;
			let rotate = 0;

			return [...Array(props.ingredients[igKey])].map((_, i) => {
				const multipleIngredients = [];

				for (let x = 0; x < 5; x++) {
					positionY = 400 - x * 100;
					positionX = Math.floor(Math.random() * 440);
					rotate = Math.floor(Math.random() * 360);
					multipleIngredients.push(
						<PizzaIngredient
							key={igKey + i + x + 'v'}
							type={igKey}
							ingredientStyle={
								!props.smallIng
									? {
											transform: `scale(.25) translate(-${positionX}%, -${positionY}%) rotate(${rotate}deg)`,
									  }
									: {
											transform: `scale(.2) translate(-${positionX}%, -${positionY}%) rotate(${rotate}deg)`,
									  }
							}
						/>
					);
				}
				for (let x = 0; x < 5; x++) {
					positionX = 400 - x * 100;
					positionY = Math.floor(Math.random() * 440);
					rotate = Math.floor(Math.random() * 360);
					multipleIngredients.push(
						<PizzaIngredient
							key={igKey + i + x + 'h'}
							type={igKey}
							ingredientStyle={
								!props.smallIng
									? {
											transform: `scale(.25) translate(-${positionX}%, -${positionY}%) rotate(${rotate}deg)`,
									  }
									: {
											transform: `scale(.2) translate(-${positionX}%, -${positionY}%) rotate(${rotate}deg)`,
									  }
							}
						/>
					);
				}
				return multipleIngredients;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p className="no-ingredients">Please start adding ingredients!</p>;
	}
	return (
		<div className="pizza" style={props.dimensions}>
			{transformedIngredients}
		</div>
	);
};

export default React.memo(Pizza);
