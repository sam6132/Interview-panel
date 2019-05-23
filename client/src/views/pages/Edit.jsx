import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
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
			number: '',
			rounds: '',
			comments: ''
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/api/candidate/edit/' + this.props.match.params.id)
			.then(res => {
				this.setState({
					name: res.data.candidate.name,
					email: res.data.candidate.email,
					number: res.data.candidate.number,
					rounds: res.data.candidate.rounds
					// comments: res.data.candidates.comments
				});
				console.log(res);
			})
			.catch(function(error) {
				console.log(error);
			});
		// this.props.history.push('/index');
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
			number: e.target.value
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
		const obj = {
			name: this.state.name,
			email: this.state.email,
			number: this.state.number,
			rounds: this.state.rounds,
			comments: this.state.comments
		};
		console.log(obj);
		axios
			.post('http://localhost:5000/api/candidate/update/' + this.props.match.params.id, obj)
			.then(res => console.log(res))
			.catch(err => {
				console.log(err);
			});

		this.props.history.push('/Profile');
	}

	render() {
		return (
			<div style={{ marginTop: 10 }}>
				<h3 align="center">Update Candidate Details</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Person Name: </label>
						<input
							type="text"
							className="form-control"
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
							value={this.state.number}
							onChange={this.onChangePhoneNumber}
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
						<input type="submit" value="Update persondetails" className="btn btn-primary" />
					</div>
				</form>
			</div>
		);
	}
}
