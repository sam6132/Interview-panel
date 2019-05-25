import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	div,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col
} from 'reactstrap';

// core components
import Header from 'components/Navbars/Nav.jsx';

class Login extends React.Component {
	state = {
		email: '',
		password: '',
		msg: null
	};
	componentDidMount() {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		this.refs.main.scrollTop = 0;
	}

	login = e => {
		e.preventDefault();
		let user = {
			email: this.state.email,
			password: this.state.password
		};
		axios
			.post('http://localhost:5000/api/user/login', user)
			.then(res => {
				let data = res.data;
				console.log(data);
				if (data.success === false) return this.setState({ msg: data.message });
				localStorage.setItem('token', data.accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
				localStorage.setItem('user_id', data.user.id);

				this.props.history.push('/profile');
			})
			.catch(err => {
				return this.setState({ msg: err.message });
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
							<div className=" row justify-content-center">
								<div className="col-lg-5">
									<div className="card bg-secondary shadow border-0">
										<div className=" card-header bg-white pb-5">
											<div className="text-center mb-2">
												<h3>Sign in with credentials</h3>
											</div>
										</div>
										<div className=" card-body px-lg-5 py-lg-5">
											{this.state.msg ? (
												<div className="alert alert-danger text-center">{this.state.msg}</div>
											) : (
												''
											)}

											<form className="form" role="form" onSubmit={this.login}>
												<div className="mb-3 form-group">
													<InputGroup className="input-group-alternative">
														<InputGroupAddon addonType="prepend">
															<InputGroupText>
																<i className="ni ni-email-83" />
															</InputGroupText>
														</InputGroupAddon>
														<Input
															placeholder="Email"
															type="email"
															onChange={e => this.setState({ email: e.target.value })}
														/>
													</InputGroup>
												</div>
												<div className="form-group">
													<InputGroup className="input-group-alternative">
														<InputGroupAddon addonType="prepend">
															<InputGroupText>
																<i className="ni ni-lock-circle-open" />
															</InputGroupText>
														</InputGroupAddon>
														<Input
															placeholder="Password"
															type="password"
															autoComplete="off"
															value={this.state.password}
															onChange={e => this.setState({ password: e.target.value })}
														/>
													</InputGroup>
												</div>

												<div className="text-center">
													<button
														onClick={this.login}
														className="btn btn-primary my-4"
														color="primary"
														type="button"
													>
														Sign in
													</button>
												</div>
											</form>
										</div>
									</div>
									<div className="row mt-3">
										<div className="col text-center">
											<Link to="/register" className="text-light">
												<small>Create new account</small>
											</Link>
										</div>
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

export default Login;
