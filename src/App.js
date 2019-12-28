import React, { useEffect, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';
import Layout from './containers/Layout/Layout';
import PizzaBuilder from './containers/PizzaBuilder/PizzaBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';

const Auth = React.lazy(() => {
	return import('./containers/Auth/Auth');
});

const Orders = React.lazy(() => {
	return import('./containers/Orders/Orders');
});

const Checkout = React.lazy(() => {
	return import('./containers/Checkout/Checkout');
});

const Examples = React.lazy(() => {
	return import('./containers/Examples/Examples');
});

function App(props) {
	const { onTryAutoSignup } = props;
	useEffect(() => onTryAutoSignup(), [onTryAutoSignup]);

	let routes = (
		<Switch>
			<Route path="/auth" render={props => <Auth {...props} />} />
			<Route path="/examples" render={props => <Examples {...props} />} />
			<Route path="/" exact component={PizzaBuilder} />
			<Redirect to="/" />
		</Switch>
	);

	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route path="/checkout" render={props => <Checkout {...props} />} />
				<Route path="/orders" render={props => <Orders {...props} />} />
				<Route path="/logout" component={Logout} />
				{/* <Route path="/auth" render={props => <Auth {...props} />} /> */}
				<Route path="/examples" render={props => <Examples {...props} />} />
				<Route path="/" exact component={PizzaBuilder} />
				<Redirect to="/" />
			</Switch>
		);
	}

	return (
		<Layout>
			<Suspense fallback={<Spinner />}>{routes}</Suspense>
		</Layout>
	);
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
