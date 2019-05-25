import React, { Component } from 'react';
import Login from 'views/pages/Login.jsx';
import Register from 'views/pages/Register.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profile from 'views/pages/Profile';
import Edit from 'views/pages/Edit';
import Create from 'views/pages/Create';
import Nav from 'components/Navbars/Nav.jsx';
import PrivateRoute from 'components/PrivateRoute';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Nav />
				<Switch>
					<Route path="/" exact render={props => <Login {...props} />} />

					<Route path="/home" exact render={props => <Profile {...props} />} />
					{/* <Route path="/Edit" exact render={props => <Edit {...props} />} /> */}
					<Route path="/register" exact render={props => <Register {...props} />} />
					{/* <Route path="/create" exact render={props => <Create {...props} />} /> */}
					<PrivateRoute path="/profile" component={Profile} />
					{/* <Route path="/edit/:id" excat render={props => <Edit {...props} />} /> */}
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
