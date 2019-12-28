import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('localId');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (username, password, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			username: username,
			password: password,
		};
		let url = 'http://127.0.0.1:8080/register'; //register
		if (!isSignup) {
			url = 'http://127.0.0.1:8080/authenticate'; //login
		}
		axios
			.post(url, authData)
			.then(response => {
				const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('userId', response.data.username);
				dispatch(authSuccess(response.data.token, response.data.username));
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch(err => {
				dispatch(authFail(err.response.data.error));
			});
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};
