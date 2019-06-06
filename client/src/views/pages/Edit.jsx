import React, { Component } from 'react';
import axios from 'axios';
import Header from 'components/Navbars/Nav';

import { editCandidate } from 'services/candidate';
import loader from '../../assets/img/loading img/loader.gif';
import Loading from 'components/Models/loadingModle';
import 'assets/css/style.css';
import RoundDetailTable from './RoundDetails';
import SideBar from 'views/pages/SideBar';

export default class Edit extends Component {
	state = {
		candidate: '',
		// infoModel: false,
		// addRoundModel: false,
		candidate_id: ''
	};

	componentDidMount() {
		this.setState({ candidate_id: this.props.match.params.id });
		this.setState({ candidate: this.props.location.state });
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
										<p className="lead text-white mt-1">{this.state.candidate._id}.</p>

										<p className="lead text-white mt-1">{this.state.candidate.name}.</p>
										<p className="lead text-white mt-1 ">{this.state.candidate.email}</p>
										<p className="lead text-white mt-1">{this.state.candidate.number}</p>
									</div>
								</div>
							</div>
						</div>
						<div className="container">
							<div className="review-card bg-primary  shadow  border-10 ">
								<RoundDetailTable className="mb-lg" {...this.props} />
								{/* <EditableTable /> */}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}
