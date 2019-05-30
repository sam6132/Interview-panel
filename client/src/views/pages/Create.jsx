import React, { Component } from 'react';
import axios from 'axios';
import { addCandidate } from 'services/candidate';

export default class Create extends Component {
	state = {
		name: '',
		email: '',
		number: '',
		msg: null
	};

	onSubmit = e => {
		e.preventDefault();
		let candidate = {
			name: this.state.name,
			email: this.state.email,
			number: this.state.number
		};
		addCandidate(candidate)
			.then(res => {
				let data = res.data;
				console.log(data);
				if (data.success === false) return this.setState({ msg: data.message });
			})
			.catch(error => {
				this.setState({ msg: error.message });
			});
		this.setState({
			name: '',
			email: '',
			number: ''
		});
	};

	render() {
		return (
			<div className="card bg-white shadow border-10 ">
				<h3 align="center" className="card-header">
					Add Candidate Details
				</h3>
				<form onSubmit={this.onSubmit} className="card-body">
					{this.state.msg ? <div className="alert alert-danger text-center">{this.state.msg}</div> : ''}
					<div className="form-group">
						<input
							placeholder=" name"
							type="text"
							className="form-control "
							value={this.state.name}
							aria-label="name"
							aria-required="true"
							name="name"
							onChange={e => this.setState({ name: e.target.value })}
						/>
					</div>
					<div className="form-group">
						<input
							placeholder=" Email"
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
						<input
							placeholder="Mobile number"
							type="text"
							className="form-control"
							value={this.state.number}
							aria-label="number"
							aria-required="true"
							name="number"
							onChange={e => this.setState({ number: e.target.value })}
						/>
					</div>

					<div className="form-group text-center">
						<input type="submit" value="Add Candidate" className="btn btn-primary" />
					</div>
				</form>
			</div>
		);
	}
}
