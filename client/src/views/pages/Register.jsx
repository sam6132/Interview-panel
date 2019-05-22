import React from 'react';
import { Link } from 'react-router-dom';

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	UncontrolledDropdown,
	DropdownToggle,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col
} from 'reactstrap';

// core components
import Header from 'components/Navbars/Nav.jsx';

class Register extends React.Component {
	componentDidMount() {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		this.refs.main.scrollTop = 0;
	}
	state = {
		email: null,
		password: null,
		role: 'HR'
	};

	register = e => {
		e.preventDefault();
		console.log(this.state);
	};
	render() {
		return (
			<div>
				<Header />
				<main ref="main">
					<section className="section section-shaped section-lg">
						<div className="shape shape-style-1 bg-gradient-default">
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
						</div>
						<Container className="pt-lg-sm">
							<Row className="justify-content-center">
								<Col lg="5">
									<Card className="bg-secondary shadow border-0">
										<CardHeader className="bg-white pb-5">
											<div className="text-center mb-2">
												<h3>Register with credentials</h3>
											</div>
										</CardHeader>
										<CardBody className="px-lg-5 py-lg-5">
											<Form role="form">
												<FormGroup>
													<InputGroup className="input-group-alternative mb-3">
														<InputGroupAddon addonType="prepend">
															<InputGroupText>
																<i className="ni ni-hat-3" />
															</InputGroupText>
														</InputGroupAddon>
														<Input
															placeholder="Email"
															onChange={e => this.setState({ email: e.target.value })}
															type="email"
														/>
													</InputGroup>
												</FormGroup>
												<FormGroup>
													<InputGroup className="input-group-alternative mb-3">
														<InputGroupAddon addonType="prepend">
															<InputGroupText>
																<i className="ni ni-email-83" />
															</InputGroupText>
														</InputGroupAddon>
														<Input
															placeholder="Password"
															onChange={e => this.setState({ password: e.target.value })}
															type="password"
														/>
													</InputGroup>
												</FormGroup>
												<FormGroup>
													<select
														value={this.state.role}
														onChange={e => this.setState({ role: e.target.value })}
													>
														<option value="HR">HR</option>
														<option value="Team lead">Team lead</option>
														<option value="Team members">Team member</option>
													</select>
												</FormGroup>

												<div className="text-center">
													<Button
														className="mt-4"
														onClick={this.register}
														color="primary"
														type="button"
													>
														Create account
													</Button>
												</div>
											</Form>
										</CardBody>
									</Card>
									<Row className="mt-3">
										<Col className="text-center">
											<Link to="/login">
												<a className="text-light">
													<small>Already have a account</small>
												</a>
											</Link>
										</Col>
									</Row>
								</Col>
							</Row>
						</Container>
					</section>
				</main>
			</div>
		);
	}
}

export default Register;
