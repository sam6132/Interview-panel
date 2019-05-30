import React from 'react';
import { Link } from 'react-router-dom';

// reactstrap components
import { FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Col } from 'reactstrap';
import axios from 'axios';

// core components
import Header from 'components/Navbars/Nav.jsx';
import { register } from 'services/auth';

class Register extends React.Component {
	componentDidMount() {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		this.refs.main.scrollTop = 0;
	}
	state = {
		email: null,
		password: null,
		role: 'HR',
		msg: null,
		loggingIn: false
	};

	register = e => {
		e.preventDefault();
		this.setState({ loggingIn: true });
		let user = {
			email: this.state.email,
			password: this.state.password,
			role: this.state.role
		};
		register(user)
			.then(res => {
				let data = res.data;
				console.log(data);
				if (data.success === false) return this.setState({ msg: data.message, loggingIn: false });

				this.props.history.push('/');
			})
			.catch(err => {
				return this.setState({ loggingIn: false });
			});
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
						<div className="container pt-lg-sm">
							<div className="row justify-content-center">
								<div className="col-lg-5" lg="5">
									<div className="card bg-secondary shadow border-0">
										<div className=" card-header bg-white pb-5">
											<div className="text-center mb-2">
												<h3>Register with credentials</h3>
											</div>
										</div>
										<div className="card-body px-lg-5 py-lg-5">
											{this.state.msg ? (
												<div className="alert alert-danger text-center">{this.state.msg}</div>
											) : (
												''
											)}

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
															aria-label="email"
															aria-required="true"
															name="email"
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
															aria-label="email"
															aria-required="true"
															name="email"
															onChange={e => this.setState({ password: e.target.value })}
															type="password"
														/>
													</InputGroup>
												</FormGroup>
												<FormGroup>
													<select
														className="input-group-alternative mb-3 custom-select"
														value={this.state.role}
														onChange={e => this.setState({ role: e.target.value })}
													>
														<option value="HR">HR</option>
														<option value="Team lead">Team lead</option>
														<option value="Team members">Team member</option>
													</select>
												</FormGroup>

												<div className="text-center">
													{!this.state.loggingIn ? (
														<button
															className="btn btn-primary mt-4"
															onClick={this.register}
															color="primary"
															type="button"
															role="register"
															aria-label="register"
														>
															Create account
														</button>
													) : (
														<button className="btn btn-primary my-4" type="button" disabled>
															<span
																className="spinner-border spinner-border-sm"
																role="status"
																aria-hidden="true"
																role="register"
																aria-label="register"
															/>
															Loading...
														</button>
													)}
												</div>
											</Form>
										</div>
									</div>
									<div className="row mt-3">
										<Col className="text-center">
											<Link to="/" className="text-light">
												<small>Already have a account</small>
											</Link>
										</Col>
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		);
	}
}

export default Register;
