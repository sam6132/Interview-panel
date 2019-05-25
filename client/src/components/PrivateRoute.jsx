import React, { PureComponent, Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (localStorage.length > 0 ? <Component {...props} /> : <Redirect to="/" />)} />
);

export default PrivateRoute;
