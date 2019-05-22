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
		email: null,
		password: null
	};
	componentDidMount() {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		this.refs.main.scrollTop = 0;
	}

	login = e => {
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
												<h3>Sign in with credentials</h3>
											</div>
										</CardHeader>
										<CardBody className="px-lg-5 py-lg-5">
											<Form role="form" onSubmit={this.login}>
												<FormGroup className="mb-3">
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
												</FormGroup>
												<FormGroup>
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
															onChange={e => this.setState({ password: e.target.value })}
														/>
													</InputGroup>
												</FormGroup>
												<div className="custom-control custom-control-alternative custom-checkbox">
													<input
														className="custom-control-input"
														id=" customCheckLogin"
														type="checkbox"
													/>
													<label className="custom-control-label" htmlFor=" customCheckLogin">
														<span>Remember me</span>
													</label>
												</div>
												<div className="text-center">
													<Button
														onClick={this.login}
														className="my-4"
														color="primary"
														type="button"
													>
														Sign in
													</Button>
												</div>
											</Form>
										</CardBody>
									</Card>
									<Row className="mt-3">
										<Col className="text-center">
											<Link to="/register">
												<a className="text-light">
													<small>Create new account</small>
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

export default Login;
