import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import './ContactData.scss';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-service';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Modal from './../../../components/UI/Modal/Modal';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = props => {
	const [orderForm, setOrderForm] = useState({
		name: {
			elementType: 'input',
			name: 'name',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Name',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		street: {
			elementType: 'input',
			name: 'street',
			elementConfig: {
				type: 'text',
				placeholder: 'Street',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		zipCode: {
			elementType: 'input',
			name: 'ZIP Code',
			elementConfig: {
				type: 'text',
				placeholder: 'ZIP Code',
			},
			value: '',
			validation: {
				required: true,
				isNumeric: true,
				minLength: 5,
				maxLength: 5,
			},
			valid: false,
			touched: false,
		},
		country: {
			elementType: 'input',
			name: 'country',
			elementConfig: {
				type: 'text',
				placeholder: 'Country',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		email: {
			elementType: 'input',
			name: 'e-mail',
			elementConfig: {
				type: 'email',
				placeholder: 'Your E-Mail',
			},
			value: '',
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
		deliveryMethod: {
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: 'fastest', displayValue: 'Fastest' },
					{ value: 'cheapest', displayValue: 'Cheapest' },
				],
			},
			value: 'fastest',
			validation: true,
			valid: true,
			touched: true,
		},
	});
	const [formIsValid, setFormIsValid] = useState(false);
	const [ordered, setOrdered] = useState(false);

	const orderHandler = event => {
		event.preventDefault();
		const formData = {};
		for (let formElementIdentifier in orderForm) {
			formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
		}
		const order = {
			ingredients: props.ingredients,
			price: props.price,
			orderData: formData,
			userId: props.userId,
		};
		setOrdered(true);
		props.onOrderPizza(order, props.token);
	};

	const inputChangedHandler = (event, inputIdentifier) => {
		const updatedFormElement = updateObject(orderForm[inputIdentifier], {
			value: event.target.value,
			valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
		});
		const updatedOrderForm = updateObject(orderForm, {
			[inputIdentifier]: updatedFormElement,
		});

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		setOrderForm(updatedOrderForm);
		setFormIsValid(formIsValid);
	};

	const inputFocusedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...orderForm,
		};
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier],
		};
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		setOrderForm(updatedOrderForm);
	};

	const formElementsArray = [];
	for (let key in orderForm) {
		formElementsArray.push({
			id: key,
			setup: orderForm[key],
			name: orderForm[key].name,
		});
	}
	let form = (
		<form onSubmit={orderHandler}>
			{formElementsArray.map(formElement => (
				<Input
					key={formElement.id}
					elementType={formElement.setup.elementType}
					elementConfig={formElement.setup.elementConfig}
					value={formElement.setup.value}
					name={formElement.name}
					invalid={!formElement.setup.valid}
					shouldValidate={formElement.setup.validation}
					touched={formElement.setup.touched}
					changed={event => inputChangedHandler(event, formElement.id)}
					focused={event => inputFocusedHandler(event, formElement.id)}
				/>
			))}
			<Button type="Success" disabled={!formIsValid}>
				ORDER
			</Button>
		</form>
	);

	if (props.loading) form = <Spinner />;

	return (
		<Fragment>
			<Modal
				show={ordered}
				modalClosed={() => {
					setOrdered(false);
					props.history.push('/');
				}}
			>
				<div className="purchased">
					<h2 className="purchased__title">Success!</h2>
					<p className="purchased__paragraph">
						Your order will arrive in less than <b>one hour</b>.
					</p>
					<p className="purchased__paragraph">Modal will close automatically in less than 5 seconds.</p>
				</div>
			</Modal>
			<div className="contact-data">
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		</Fragment>
	);
};

const mapStateToProps = state => {
	return {
		ingredients: state.pizzaBuilder.ingredients,
		price: state.pizzaBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onOrderPizza: (orderData, token) => dispatch(actions.purchasePizza(orderData, token)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(React.memo(ContactData), axios));
