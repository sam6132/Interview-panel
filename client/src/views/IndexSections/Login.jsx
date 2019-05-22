import React from 'react';
import { Link } from 'react-router-dom';
// nodejs library that concatenates classes
import classnames from 'classnames';

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

class Login extends React.Component {
	state = {};
	render() {
		return (
			<div>
				<section className="section section-lg section-shaped">
					<div className="shape shape-style-1 shape-default">
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
					</div>
					<Container className="py-md">
						<Row className="row-grid justify-content-between align-items-center">
							<Col className="mb-lg-auto" lg="5">
								<div className="transform-perspective-right">
									<Card className="bg-secondary shadow border-0">
										<CardBody className="px-lg-5 py-lg-5">
											<div className="text-center text-muted mb-4">
												<small>Or sign in with credentials</small>
											</div>
											<Form role="form">
												<FormGroup
													className={classnames('mb-3', {
														focused: this.state.emailFocused
													})}
												>
													<InputGroup className="input-group-alternative">
														<InputGroupAddon addonType="prepend">
															<InputGroupText>
																<i className="ni ni-email-83" />
															</InputGroupText>
														</InputGroupAddon>
														<Input
															placeholder="Email"
															type="email"
															onFocus={e => this.setState({ emailFocused: true })}
															onBlur={e => this.setState({ emailFocused: false })}
														/>
													</InputGroup>
												</FormGroup>
												<FormGroup
													className={classnames({
														focused: this.state.passwordFocused
													})}
												>
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
															onFocus={e => this.setState({ passwordFocused: true })}
															onBlur={e => this.setState({ passwordFocused: false })}
														/>
													</InputGroup>
												</FormGroup>
												<div className="custom-control custom-control-alternative custom-checkbox">
													<input
														className="custom-control-input"
														id="customCheckLogin2"
														type="checkbox"
													/>
													<label className="custom-control-label" htmlFor="customCheckLogin2">
														<span>Remember me</span>
													</label>
												</div>
												<div className="text-center">
													<Button className="my-4" color="primary" type="button">
														Sign in
													</Button>
												</div>
											</Form>
										</CardBody>
									</Card>
								</div>
							</Col>
						</Row>
					</Container>
				</section>
			</div>
		);
	}
}

export default Login;
