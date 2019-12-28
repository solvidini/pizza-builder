import React from 'react';
import PropTypes from 'prop-types';

import './PizzaIngredient.scss';

//SVGs
import Tomato from '../../../assets/ingredients/tomato.svg';
import Pepperoni from '../../../assets/ingredients/pepperoni.svg';
import Jalapeno from '../../../assets/ingredients/jalapeno.svg';
import Cheese from '../../../assets/ingredients/cheese.svg';
import Cucumber from '../../../assets/ingredients/cucumber.svg';
import Mushroom from '../../../assets/ingredients/mushroom.svg';
import Pineapple from '../../../assets/ingredients/pineapple.svg';
import Olive from '../../../assets/ingredients/olive.svg';
import Paprika from '../../../assets/ingredients/paprika.svg';
import Oregano from '../../../assets/ingredients/oregano.svg';

const PizzaIngredient = props => {
	let ingredient = null;

	switch (props.type) {
		case 'tomato':
			ingredient = (
				<div className="ingredient" style={props.ingredientStyle}>
					<img src={Tomato} alt="ingredient" draggable="false" />
				</div>
			);
			break;
		case 'pepperoni':
			ingredient = (
				<div className="ingredient" style={props.ingredientStyle}>
					<img src={Pepperoni} alt="ingredient" draggable="false" />
				</div>
			);
			break;
		case 'jalapeno':
			ingredient = (
				<div className="ingredient" style={props.ingredientStyle}>
					<img src={Jalapeno} alt="ingredient" draggable="false" />
				</div>
			);
			break;
		case 'cheese':
			ingredient = (
				<div className="ingredient" style={props.ingredientStyle}>
					<img src={Cheese} alt="ingredient" draggable="false" />
				</div>
			);
			break;
		case 'cucumber':
			ingredient = (
				<div className="ingredient" style={props.ingredientStyle}>
					<img src={Cucumber} alt="ingredient" draggable="false" />
				</div>
			);
			break;
		case 'mushroom':
			ingredient = (
				<div className="ingredient" style={props.ingredientStyle}>
					<img src={Mushroom} alt="ingredient" draggable="false" />
				</div>
			);
			break;
		case 'pineapple':
			ingredient = (
				<div className="ingredient" style={props.ingredientStyle}>
					<img src={Pineapple} alt="ingredient" draggable="false" />
				</div>
			);
			break;
		case 'olive':
			ingredient = (
				<div className="ingredient" style={props.ingredientStyle}>
					<img src={Olive} alt="ingredient" draggable="false" />
				</div>
			);
			break;
		case 'paprika':
			ingredient = (
				<div className="ingredient" style={props.ingredientStyle}>
					<img src={Paprika} alt="ingredient" draggable="false" />
				</div>
			);
			break;
		case 'oregano':
			ingredient = (
				<div className="ingredient" style={props.ingredientStyle}>
					<img src={Oregano} alt="ingredient" draggable="false" />
				</div>
			);
			break;
		default:
			ingredient = null;
	}

	return ingredient;
};

PizzaIngredient.propTypes = {
	type: PropTypes.string.isRequired,
};

export default PizzaIngredient;
