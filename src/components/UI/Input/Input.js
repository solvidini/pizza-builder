import React from 'react';

import classes from './Input.module.scss';

const Input = props => {
	let inputElement = null;
	const inputClasses = [classes.InputElement];

	let validationError = null;

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
		if (props.shouldValidate.minLength && !props.shouldValidate.maxLength) {
			validationError = (
				<p className={classes.ValidationError}>
					{props.name} should have at least {props.shouldValidate.minLength} characters.{' '}
				</p>
			);
		} else validationError = <p className={classes.ValidationError}>Please enter a valid {props.name}!</p>;
	}

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
					onFocus={props.focused}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
					onFocus={props.focused}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
					onFocus={props.focused}
				/>
			);
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
			{validationError}
		</div>
	);
};

export default Input;
