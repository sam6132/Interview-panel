import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CandidateInfo from 'components/Models/candidateInfo';
import 'assets/css/style.css';
import AddRoundModel from 'components/Models/addRound';
class TableRow extends Component {
	state = {
		candidates: [],
		infoModel: false,
		roundModel: false,
		candidate: null
	};
	componentDidMount() {
		console.log(this.props);
		setInterval(() => {
			this.getCandidates();
		}, 2000);

		// let candidateList = this.tabRow();
	}
	getCandidates() {
		axios
			.get('http://localhost:5000/api/candidate/', {
				headers: { 'x-auth': localStorage.getItem('token') }
			})
			.then(response => {
				// console.log(response.data);
				const userId = localStorage.getItem('user_id');
				const token = localStorage.getItem('refreshToken');
				if (response.data.success === false) {
					return axios.get(`http://localhost:5000/api/user/verify/${userId}&${token}`);
				}
				this.setState({
					candidates: response.data
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	delete(id) {
		axios
			.get('http://localhost:5000/api/candidate/delete/' + id, {
				headers: { 'x-auth': localStorage.getItem('token') }
			})
			.then(res => {
				// let candidates = [res.data] ? [res.data] : [];
				// console.log(candidates);
				this.getCandidates();
				// if (candidates) this.setState({ candidates: candidates });
			})
			.catch(err => console.log(err));
	}

	toggleInfoModal = state => {
		this.setState({
			[state]: !this.state.infoModel
		});
	};
	toggleRoundModal = state => {
		this.setState({
			[state]: !this.state.roundModel
		});
	};

	render() {
		return (
			<div className="card bg-white sticky-top shadow  border-10 ">
				<CandidateInfo
					infoModel={this.state.infoModel}
					candidate={this.state.candidate}
					toggleModal={this.toggleInfoModal}
				/>
				<AddRoundModel
					roundModel={this.state.roundModel}
					candidateId={this.state.candidate ? this.state.candidate._id : ''}
					toggleModal={this.toggleRoundModal}
				/>

				<div className=" card-header  bg-secondary pb-2">
					<div className="text-center mb-2">
						<h3>Candidate's</h3>
					</div>
				</div>
				<table className="table table-hover table-sm  ">
					<thead>
						<tr>
							<th className="text-center">Name</th>
							<th className="text-center">Email</th>
							<th className="text-center">Phone number</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						{this.state.candidates.map(can => {
							return (
								<tr key={can._id}>
									<td className="text-center">{can.name}</td>
									<td className="text-center">{can.email}</td>
									<td className="text-center">{can.number}</td>
									<td className="text-center">
										<div className="row">
											<div className="col-md-4 col-sm-4 mb-1 ">
												<button
													onClick={() => {
														this.toggleInfoModal('infoModel');
														this.setState({ candidate: can });
													}}
													className="btn btn-md btn-primary pull-left "
												>
													<span className="btn-inner--icon">
														<i className="fa fa-eye" />
													</span>
												</button>
											</div>

											<div className="col-md-4 col-sm-4 mb-1 ">
												<button
													onClick={() => {
														this.toggleRoundModal('roundModel');
														this.setState({ candidate: can });
													}}
													className="btn btn-md btn-primary pull-left "
												>
													<span className="btn-inner--icon">
														<i className="fa fa-edit" />
													</span>
												</button>
											</div>

											<div className="col-md-4 col-sm-4 mb-1 ">
												<button
													onClick={() => {
														this.delete(can._id);
													}}
													className="btn btn-md btn-danger pull-left "
												>
													<span className="btn-inner--icon">
														<i className="fa fa-trash" />
													</span>
												</button>
											</div>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default TableRow;
