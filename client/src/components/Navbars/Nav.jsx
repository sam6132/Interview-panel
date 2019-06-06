import React from 'react';
import { Link } from 'react-router-dom';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js';

import { logout } from 'services/auth';
import { isLoggedIn } from 'services/auth';

class Header extends React.Component {
	componentDidMount() {
		// let headroom = new Headroom(document.getElementById('head-nav'));
		// initialise
		// headroom.init();
	}

	render() {
		return (
			<div>
				<header className="header-global">
					<div className="navbar navbar-expand-lg navbar-transparent navbar-light headroom">
						<div className="container">
							<a className=" navbar-brand mr-lg-5" href={isLoggedIn ? '/profile' : '/'}>
								<img
									className="px-1"
									alt="logo"
									src={require('assets/img/brand/argon-react-white.png')}
								/>
								TRANXIT
							</a>

							{isLoggedIn() ? (
								<ul className="navbar-nav  ml-lg-auto">
									<li className="nav-item">
										<Link className="text-white" to="" onClick={logout}>
											Logout
										</Link>
									</li>
								</ul>
							) : (
								''
							)}
						</div>
					</div>
				</header>
			</div>
		);
	}
}

export default Header;
