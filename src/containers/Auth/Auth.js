import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './Auth.scss';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {
	const [authForm, setAuthForm] = useState({
		username: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your username',
			},
			value: '',
			validation: {
				required: true,
				minLength: 3,
			},
			valid: false,
			touched: false,
		},
		password: {
			elementType: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'Your password',
			},
			value: '',
			validation: {
				required: true,
				minLength: 6,
			},
			valid: false,
			touched: false,
		},
	});
	const [isSignup, setIsSignup] = useState(false);

	const { buildingPizza, authRedirectPath, onSetAuthRedirectPath } = props;

	useEffect(() => {
	  if (!buildingPizza && authRedirectPath !== "/") {
		onSetAuthRedirectPath();
	  }
	}, [buildingPizza, authRedirectPath, onSetAuthRedirectPath]);

	const inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(authForm, {
			[controlName]: updateObject(authForm[controlName], {
				value: event.target.value,
				valid: checkValidity(event.target.value, authForm[controlName].validation),
			}),
		});
		setAuthForm(updatedControls);
	};

	const inputFocusedHandler = (event, controlName) => {
		const updatedControls = {
			...authForm,
		};
		const updatedFormElement = {
			...updatedControls[controlName],
		};
		updatedFormElement.touched = true;
		updatedControls[controlName] = updatedFormElement;
		setAuthForm(updatedControls);
	};

	const submitHandler = event => {
		event.preventDefault();
		props.onAuth(authForm.username.value, authForm.password.value, isSignup);
	};

	const switchAuthModeHandler = () => {
		setIsSignup(!isSignup);
	};

	const formElementsArray = [];
	for (let key in authForm) {
		formElementsArray.push({
			id: key,
			setup: authForm[key],
			name: key,
		});
	}

	let form = formElementsArray.map(formElement => (
		<Input
			key={formElement.id}
			name={formElement.name}
			elementType={formElement.setup.elementType}
			elementConfig={formElement.setup.elementConfig}
			value={formElement.setup.value}
			invalid={!formElement.setup.valid}
			shouldValidate={formElement.setup.validation}
			touched={formElement.setup.touched}
			changed={event => inputChangedHandler(event, formElement.id)}
			focused={event => inputFocusedHandler(event, formElement.id)}
		/>
	));

	if (props.loading) {
		form = <Spinner />;
	}

	let errorMessage = null;

	if (props.error) {
		let uglyErrorMessage = props.error.replace(/_/g, ' ');
		if (uglyErrorMessage === 'Unauthorized') {
			uglyErrorMessage = 'INVALID USERNAME OR PASSWORD';
		} else {
			uglyErrorMessage = 'SOMETHING WENT WRONG. TRY AGAIN.';
		}
		errorMessage = <p style={{ color: 'red' }}>{uglyErrorMessage}</p>;
	}

	let authRedirect = null;
	if (props.isAuthenticated) {
		authRedirect = <Redirect to={props.authRedirectPath} />;
	}

	let canSubmit = false;
	if (authForm.username.valid && authForm.password.valid) canSubmit = true;

	return (
		<div className="authentication">
			{authRedirect}
			<h2 className="authentication__title">{isSignup ? 'REGISTER' : 'SIGN IN'}</h2>
			{errorMessage}
			<form onSubmit={submitHandler}>
				{form}
				<Button type="Success" disabled={!canSubmit}>
					SUBMIT
				</Button>
			</form>
			<Button type="Text" clicked={switchAuthModeHandler}>
				{!isSignup ? "Don't have an account? REGISTER" : 'Have an account? SIGN IN'}
			</Button>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingPizza: state.pizzaBuilder.building,
		authRedirectPath: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (username, password, isSignup) => dispatch(actions.auth(username, password, isSignup)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
