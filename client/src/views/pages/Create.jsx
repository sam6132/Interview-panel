import React, { Component } from 'react';
import axios from 'axios';

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
		axios
			.post('http://localhost:5000/api/candidate/add', candidate, {
				headers: { 'x-auth': localStorage.getItem('token') }
			})
			.then(res => {
				let data = res.data;
				console.log(data);
				if (data.success === false) return this.setState({ msg: data.message });
			})
			.catch(error => {
				this.setState({ msg: error });
			});
		this.setState({
			name: '',
			email: '',
			number: ''
		});
	};

	render() {
		return (
			<div className="card bg-white sticky-top shadow border-10 ">
				<h3 align="center" className="card-header">
					Add Candidate Details
				</h3>
				<form onSubmit={this.onSubmit} className="card-body">
					{this.state.msg ? <div className="alert alert-danger text-center">{this.state.msg}</div> : ''}
					<div className="form-group">
						<label>Person Name: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.name}
							onChange={e => this.setState({ name: e.target.value })}
						/>
					</div>
					<div className="form-group">
						<label>Email: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.email}
							onChange={e => this.setState({ email: e.target.value })}
						/>
					</div>
					<div className="form-group">
						<label>Mobile Number: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.number}
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
