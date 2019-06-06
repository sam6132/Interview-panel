import React, { Component } from 'react';
import axios from 'axios';
import Header from 'components/Navbars/Nav';
import { editCandidate } from 'services/candidate';
import { getReview } from 'services/review';
import SideBar from 'views/pages/SideBar';

export default class EditReview extends Component {
	state = {
		title: '',
		comment: '',
		qualified: false,
		loading: false
	};

	componentDidMount() {
		console.log(this.props.match.params);
		// this.props.match.params.id
		getReview(this.props.match.params.r_id).then(res => {
			console.log(res);
			console.log(res.data.qualified);
			this.setState({
				title: res.data.title,
				comment: res.data.comment,
				qualified: res.data.qualified,
				loading: true
			});
		});
	}

	onSubmit = e => {
		e.preventDefault();
		this.setState({ loading: true });
		const candidate = {
			title: this.state.title,
			comment: this.state.comment,
			qualified: this.state.qualified
		};

		axios
			.post(`http://localhost:5000/api/candidate/editReview/${this.props.match.params.r_id}`, candidate, {
				headers: { 'x-auth': localStorage.getItem('token') }
			})
			// console.log(candidate)
			.then(res => {
				console.log(res);
				this.setState({ loading: false });
			})
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
						<SideBar/>
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
							<h3 align="center">Update Review for {}</h3>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<label>Person Name: </label>
									<input
										type="text"
										className="form-control"
										value={this.state.title}
										aria-label="title"
										aria-required="true"
										name="title"
										onChange={e => this.setState({ title: e.target.value })}
									/>
								</div>
								<div className="form-group">
									<label>Email: </label>
									<input
										type="text"
										className="form-control"
										value={this.state.comment}
										aria-label="comment"
										aria-required="true"
										name="comment"
										onChange={e => this.setState({ comment: e.target.value })}
									/>
								</div>
								<div className="custom-control custom-control-alternative custom-checkbox mb-sm">
									<input
										className="custom-control-input "
										value={this.state.qualified}
										checked={this.state.qualified}
										onChange={e => {
											this.setState({ qualified: e.target.checked });
										}}
										id=" customCheckLogin"
										type="checkbox"
									/>
									<label className="custom-control-label" htmlFor=" customCheckLogin">
										<span>Qualified</span>
									</label>
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
