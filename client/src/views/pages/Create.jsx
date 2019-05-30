import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
	constructor(props) {
		super(props);
		this.onChangePersonName = this.onChangePersonName.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
		this.onChangeRoundName = this.onChangeRoundName.bind(this);
		this.onChangeComments = this.onChangeComments.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			name: '',
			email: '',
			phonenumber: '',
			rounds: '',
			comments: ''
		};
	}
	onChangePersonName(e) {
		this.setState({
			name: e.target.value
		});
	}
	onChangeEmail(e) {
		this.setState({
			email: e.target.value
		});
	}
	onChangePhoneNumber(e) {
		this.setState({
			phonenumber: e.target.value
		});
	}

	onChangeRoundName(e) {
		this.setState({
			rounds: e.target.value
		});
	}

	onChangeComments(e) {
		this.setState({
			comments: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();
		console.log(this.state);
		const obj = {
			name: this.state.name,
			email: this.state.email,
			number: this.state.phonenumber,
			rounds: this.state.rounds,
			comments: this.state.comments
		};
		axios
			.post('http://localhost:5000/api/candidate/add', obj)
			.then(res => console.log(res.data))
			.catch(error => {
				console.log(error);
			});
		this.setState({
			name: '',
			email: '',
			phonenumber: '',
			roundname: '',
			comments: ''
		});
	}

	render() {
		return (
			<div style={{ marginTop: 10 }} className= "container">
				<h3 align="center">Add Candidate Details</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Person Name: </label>
						<input
							type="text"
							className="form-control "
							value={this.state.name}
							onChange={this.onChangePersonName}
						/>
					</div>
					<div className="form-group">
						<label>Email: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.email}
							onChange={this.onChangeEmail}
						/>
					</div>
					<div className="form-group">
						<label>PhoneNumber: </label>
						<input
							type="text"
							className="form-control"
							vacommentslue={this.state.phonenumber}
							oncommentsChange={this.onChangePhoneNumber}
						/>
					</div>
					<div className="form-group">
						<label>Round Name: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.rounds}
							onChange={this.onChangeRoundName}
						/>
					</div>
					<div className="form-group">
						<label>Comments: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.comments}
							onChange={this.onChangeComments}
						/>
					</div>
					<div className="form-group">
						<input type="submit" value="User details" className="btn btn-primary" />
					</div>
				</form>
			</div>
		);
	}
}
