import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import Pizza from '../../components/Pizza/Pizza';
import PizzaOverview from '../../components/Pizza/PizzaOverview/PizzaOverview';
import BuildControls from '../../components/Pizza/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Pizza/OrderSummary/OrderSummary';
import * as actions from '../../store/actions/index';
import Spinner from './../../components/UI/Spinner/Spinner';

const PizzaBuilder = props => {
	const [purchasing, setPurchasing] = useState(false);

	const updatePurchaseState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	};

	const purchaseHandler = () => {
		if (props.isAuthenticated) {
			setPurchasing(true);
		} else {
			props.onSetAuthRedirectPath('/checkout');
			props.history.push('/auth');
		}
	};

	const purchaseCancelHandler = () => {
		setPurchasing(false);
	};

	const purchaseContinueHandler = () => {
		props.onInitPurchase();
		props.history.push('/checkout');
	};

	const disabledLessInfo = {
		...props.ingredients,
	};
	for (let key in disabledLessInfo) {
		disabledLessInfo[key] = disabledLessInfo[key] <= 0;
	}
	const disabledMoreInfo = {
		...props.ingredients,
	};
	for (let key in disabledMoreInfo) {
		disabledMoreInfo[key] = disabledMoreInfo[key] >= 4;
	}

	let orderSummary = null;
	let pizza = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
	if (props.ingredients) {
		pizza = (
			<PizzaOverview
				price={props.price}
				ordered={purchaseHandler}
				isAuth={props.isAuthenticated}
				purchasable={updatePurchaseState(props.ingredients)}
				reset={props.onResetIngredients}
			>
				<BuildControls
					ingredientAdded={props.onIngredientAdded}
					ingredientRemoved={props.onIngredientRemoved}
					disabledLess={disabledLessInfo}
					disabledMore={disabledMoreInfo}
				/>
				<Pizza ingredients={props.ingredients} />
			</PizzaOverview>
		);
		orderSummary = (
			<OrderSummary
				ingredients={props.ingredients}
				price={props.price}
				purchaseCancelled={purchaseCancelHandler}
				purchaseContinued={purchaseContinueHandler}
			/>
		);
	}

	return (
		<Fragment>
			<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
			{pizza}
		</Fragment>
	);
};

const mapStateToProps = state => {
	return {
		ingredients: state.pizzaBuilder.ingredients,
		price: state.pizzaBuilder.totalPrice,
		error: state.pizzaBuilder.error,
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingredientName => dispatch(actions.addIngredient(ingredientName)),
		onIngredientRemoved: ingredientName => dispatch(actions.removeIngredient(ingredientName)), //dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName })
		onResetIngredients: () => dispatch(actions.resetIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PizzaBuilder);
