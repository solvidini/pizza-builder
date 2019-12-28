import * as actionTypes from './actionTypes';
import axios from '../../axios-service';

export const purchasePizzaSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_PIZZA_SUCCESS,
		orderId: id,
		orderData: orderData,
	};
};

export const purchasePizzaFail = error => {
	return {
		type: actionTypes.PURCHASE_PIZZA_FAIL,
		error: error,
	};
};

export const purchasePizzaStart = () => {
	return {
		type: actionTypes.PURCHASE_PIZZA_START,
	};
};

export const purchasePizza = (orderData, token) => {
	return dispatch => {
        dispatch(purchasePizzaStart());
        const orderDataWithDate = {
            ...orderData,
            date: new Date()
        }
		const config = {
			headers: {
				'Authorization': 'Bearer '.concat(token),
				'Content-Type': 'application/json',
			},
		};
		axios
			.post('/orders', orderDataWithDate, config)
			.then(response => {
				dispatch(purchasePizzaSuccess(response.data.id, orderDataWithDate));
			})
			.catch(error => {
				dispatch(purchasePizzaFail(error));
			});
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	};
};

export const fetchOrdersSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders,
	};
};

export const fetchOrdersFail = error => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error,
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};

export const fetchOrders = token => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		const config = {
			headers: {
				'Authorization': 'Bearer '.concat(token),
				'Content-Type': 'application/json',
			},
		};
		axios
			.get('/orders', config)
			.then(res => {
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
					});
				}
				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch(err => {
				dispatch(fetchOrdersFail(err));
			});
	};
};
