import React, { useState } from 'react';
import { connect } from 'react-redux';

import './Examples.scss';
import Example from '../../components/Example/Example';
import * as actions from '../../store/actions/index';

const Examples = props => {
	const [types] = useState({
		neapolitan: {
			cheese: 3,
			pepperoni: 0,
			cucumber: 0,
			tomato: 3,
			jalapeno: 0,
			mushroom: 0,
			olive: 0,
			paprika: 1,
			pineapple: 0,
			oregano: 2,
		},
		hawaii: {
			cheese: 2,
			pepperoni: 2,
			cucumber: 0,
			tomato: 0,
			jalapeno: 0,
			mushroom: 0,
			olive: 0,
			paprika: 0,
			pineapple: 3,
			oregano: 1,
		},
		greek: {
			cheese: 1,
			pepperoni: 0,
			cucumber: 3,
			tomato: 2,
			jalapeno: 0,
			mushroom: 0,
			olive: 3,
			paprika: 2,
			pineapple: 0,
			oregano: 2,
		},
		california: {
			cheese: 2,
			pepperoni: 2,
			cucumber: 0,
			tomato: 0,
			jalapeno: 0,
			mushroom: 2,
			olive: 1,
			paprika: 2,
			pineapple: 0,
			oregano: 0,
		},
		capricciosa: {
			cheese: 3,
			pepperoni: 2,
			cucumber: 0,
			tomato: 0,
			jalapeno: 2,
			mushroom: 2,
			olive: 0,
			paprika: 0,
			pineapple: 0,
			oregano: 1,
        },
        party: {
            cheese: 2,
			pepperoni: 2,
			cucumber: 2,
			tomato: 1,
			jalapeno: 2,
			mushroom: 0,
			olive: 0,
			paprika: 2,
			pineapple: 2,
			oregano: 1,
        }
	});

	const allExamples = Object.keys(types).map(type => {
		return (
			<Example
				key={type}
				name={type}
				ingredients={types[type]}
				clicked={() => {
					props.onSetIngredients(types[type]);
					props.history.push('/');
				}}
			/>
		);
	});
	return <div className="examples">{allExamples}</div>;
};

const mapDispatchToProps = dispatch => {
	return {
		onSetIngredients: ingredients => dispatch(actions.setIngredients(ingredients)),
	};
};

export default connect(null, mapDispatchToProps)(Examples);
