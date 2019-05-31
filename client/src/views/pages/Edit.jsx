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
		candidates: [],
		// infoModel: false,
		// addRoundModel: false,
		candidate_id: ''
	};

	componentDidMount() {
		console.log("we are printing the id");
		console.log(this.props.match.params.id);
		this.setState({candidate_id :this.props.match.params.id})
		console.log("we are checking after the state is set")
		console.log(this.state.candidate_id)
	}



	render() {
		return (
			<div>

				{!this.state.loading ? (
					<div className=" loader-container">
						<div className="loader m-auto" />
					</div>
				) : (  
						<div class="container"><div class="bg-gradient-warning shadow-lg border-0 card mx-auto"><div class="p-5"><div class="align-items-center row"><div class="col-lg-8"><h3 class="text-white">Candidate details.</h3>
							<p class="lead text-white mt-3"> <lable>Name:<br /></lable>{this.state.name}.</p>
							<p class="lead text-white mt-3"><lable >Email:<br /></lable>{this.state.email}</p>
							<p class="lead text-white mt-3"><lable >PhoneNumber:<br /></lable>{this.state.number}</p>
							{/* <p class="lead text-white mt-3">{this.state.rounds}</p> */}
						</div><div class="ml-lg-auto col-lg-3"><a href="#" class="btn-white btn btn-default btn-lg btn-block">performance</a></div></div></div></div></div>)}
				<div class="card bg-white  shadow  border-10 ">
					<div class=" card-header  bg-secondary pb-2">
						<div class="text-center mb-2">
							<h3>Candidate's performance</h3>
						</div>
					</div>

					<div className="m-sm ">
						<div className="">
							<div className=" pb-sm">
								{/* <TableRow /> */}
								{/* <TableRow className="mb-md" />*/}
								<RoundDetailTable candidate_id={this.props.match.params.id} />
								{/* <EditableTable /> */}
							</div>
							{/* <div className="col-md-4">
							<Create />
						</div> */}
						</div>
					</div>

				</div>
			</div>
		);
	}
}
