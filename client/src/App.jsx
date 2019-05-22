import React, { Component } from 'react';
import Login from 'views/pages/Login.jsx';
import Register from 'views/pages/Register.jsx';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Profile from 'views/pages/Profile';
import Edit from 'views/pages/Edit'

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" exact render={props => <Login {...props} />} />

					<Route path="/home" exact render={props => <Profile {...props} />} />
					<Route path = "/Edit" exact  render={props => <Edit {...props} />}/> 
					<Route  path="/register" exact render={props => <Register {...props} />} />
					<Redirect to="/" />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
