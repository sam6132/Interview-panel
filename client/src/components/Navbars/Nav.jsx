import React from 'react';
import { Link } from 'react-router-dom';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js';
// reactstrap components
import { UncontrolledCollapse, NavItem, NavLink, NavbarBrand, Navbar, Nav, Container, Row, Col } from 'reactstrap';

class Header extends React.Component {
	componentDidMount() {
		let headroom = new Headroom(document.getElementById('navbar-main'));
		// initialise
		headroom.init();
	}
	render() {
		return (
			<div>
				<header className="header-global">
					<Navbar
						className="navbar-main navbar-transparent navbar-light headroom"
						expand="lg"
						id="navbar-main"
					>
						<Container>
							<NavbarBrand className="mr-lg-5" to="/" tag={Link}>
								<img
									alt="..."
									className="px-1"
									src={require('assets/img/brand/argon-react-white.png')}
								/>
								TRANXIT
							</NavbarBrand>

							<UncontrolledCollapse navbar toggler="#navbar_global">
								<div className="navbar-collapse-header">
									<Row>
										<Col className="collapse-brand" xs="6">
											<Link to="/">
												<img alt="..." src={require('assets/img/brand/argon-react.png')} />
												TRANXIT Technology
											</Link>
										</Col>
										<Col className="collapse-close" xs="6">
											<button className="navbar-toggler" id="navbar_global">
												<span />
												<span />
											</button>
										</Col>
									</Row>
								</div>
								<Nav className="ml-lg-auto" navbar>
									<NavItem>
										<NavLink onClick={e => e.preventDefault()}>Logout</NavLink>
									</NavItem>
								</Nav>
							</UncontrolledCollapse>
						</Container>
					</Navbar>
				</header>
			</div>
		);
	}
}

export default Header;
