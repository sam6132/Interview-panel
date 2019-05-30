import React, { Component } from 'react';
import axios from 'axios';
import Header from 'components/Navbars/Nav';
import { editCandidate } from 'services/candidate';
import loader from '../../assets/img/loading img/loader.gif';
import Loading from 'components/Models/loadingModle';
import 'assets/css/style.css';

export default class Edit extends Component {
	state = {
		name: '',
		email: '',
		number: 0,
		loading: false
	};

	componentDidMount() {
		// console.log(this.props);
		editCandidate(this.props.match.params.id)
			.then(res => {
				this.setState({
					name: res.data.candidate.name,
					email: res.data.candidate.email,
					number: res.data.candidate.number,
					loading: true
				});
				// console.log(res);
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	onSubmit = e => {
		e.preventDefault();
		const candidate = {
			name: this.state.name,
			email: this.state.email,
			number: this.state.number
		};

		axios
			.post('http://localhost:5000/api/candidate/update/' + this.props.match.params.id, candidate, {
				headers: { 'x-auth': localStorage.getItem('token') }
			})
			// console.log(candidate)
			.then(res => console.log(res))
			.catch(err => {
				console.log(err.msg);
			});

		this.props.history.push('/Profile');
	};

	render() {
		return (
			<div>
				{!this.state.loading ? (
					<div className=" loader-container">
						<div className="loader m-auto" />
					</div>
				) : (
					<div>
						<Header />
						<main className="header">
							<section className="section section-shaped section-lg">
								<div className="shape shape-style-1 bg-gradient-default">
									<span />
									<span />
									<span />
									<span />
								</div>
							</section>
						</main>

						<div className="container">
							<h3 align="center">Update Candidate Details</h3>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<label>Person Name: </label>
									<input
										type="text"
										className="form-control"
										value={this.state.name}
										aria-label="name"
										aria-required="true"
										name="name"
										onChange={e => this.setState({ name: e.target.value })}
									/>
								</div>
								<div className="form-group">
									<label>Email: </label>
									<input
										type="text"
										className="form-control"
										value={this.state.email}
										aria-label="email"
										aria-required="true"
										name="email"
										onChange={e => this.setState({ email: e.target.value })}
									/>
								</div>
								<div className="form-group">
									<label>PhoneNumber: </label>
									<input
										type="text"
										className="form-control"
										value={this.state.number}
										aria-label="number"
										aria-required="true"
										name="number"
										onChange={e => this.setState({ number: e.target.value })}
									/>
								</div>

								<div className="form-group">
									<input type="submit" value="Update persondetails" className="btn btn-primary" />
								</div>
							</form>
						</div>
					</div>
				)}
			</div>
		);
	}
}
