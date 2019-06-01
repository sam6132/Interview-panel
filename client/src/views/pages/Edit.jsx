import React, { Component } from 'react';
import axios from 'axios';
import Header from 'components/Navbars/Nav';

import { editCandidate } from 'services/candidate';
import loader from '../../assets/img/loading img/loader.gif';
import Loading from 'components/Models/loadingModle';
import 'assets/css/style.css';
import RoundDetailTable from './RoundDetails';

export default class Edit extends Component {
	state = {
		candidate: '',
		// infoModel: false,
		// addRoundModel: false,
		candidate_id: ''
	};

	componentDidMount() {
		// console.log('we are printing the id');
		// console.log(this.props.match.params.id);
		this.setState({ candidate_id: this.props.match.params.id });
		this.setState({ candidate: this.props.location.state });

		// console.log('we are checking after the state is set');
		// console.log(this.state.candidate_id);
	}

	render() {
		return (
			<div>
				<Header />

				{this.state.loading ? (
					<div className=" loader-container">
						<div className="loader m-auto" />
					</div>
				) : (
					<div>
						<div className="bg-gradient-default candidate-detail shadow-lg candidate-detail  mx-auto">
							<div className="py-2 px-4  ">
								<div className="align-items-center my-md row">
									<div className="col-lg-12">
										<h3 className="text-white text-center ">Candidate's detail</h3>
										<p className="lead text-white mt-1">{this.state.candidate.name}.</p>
										<p className="lead text-white mt-1 ">{this.state.candidate.email}</p>
										<p className="lead text-white mt-1">{this.state.candidate.number}</p>
									</div>
									{/* <div className="ml-lg-auto col-lg-3">
										<a href="#" className="btn-white btn btn-default btn-lg btn-block">
											Contact
										</a>
									</div> */}
								</div>
							</div>
						</div>
						<div className="container">
							<div className="review-card bg-primary  shadow  border-10 ">
								<RoundDetailTable className="mb-lg" candidate_id={this.props.match.params.id} />
								{/* <EditableTable /> */}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}
