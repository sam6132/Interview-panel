import React, { PureComponent, Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from 'services/auth';

const PublicRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (!isLoggedIn() ? <Component {...props} /> : <Redirect to="/profile" />)} />
);

export default PublicRoute;
