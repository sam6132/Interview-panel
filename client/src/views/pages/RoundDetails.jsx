import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { getCandidates } from 'services/candidate';
import { getAccessToken } from 'services/auth';
import { editCandidateById } from 'services/candidate';
import {editRounddetails} from 'services/candidate';
import { getRoundDetailsByCandidateId } from 'services/candidate';
import { updateRoundDetailsByCandidateId } from 'services/candidate';
import {addrounds} from 'services/candidate';


const columns = [
	{ title: 'round', field: 'title' },
	{ title: 'comment', field: 'comment' },
	{ title: 'qualified', field: 'qualified', lookup: { true: 'yes', false: 'no' } }
];

export default class RoundDetailTable extends Component {
	state = {
		rounddetails: [],
		candidate_id: ''
	};

	componentDidMount() {
		this.getReview();
	}

	getReview = async () => {
		console.log('we are printhing props');
		console.log(this.props.candidate_id);

		// await this.setState({candidate_id : this.props.candidate_id})

		await getRoundDetailsByCandidateId(this.props.candidate_id)
			.then(response => {
				console.log(response.data);
				this.setState({ rounddetails: response.data });
			})
			.catch(error => {
				console.log(error);
			});
	};
	// have to write put api
	// navEdit = (e, data) => {
	// 	console.log(data);
	// 	this.props.history.push(`/updateRoundDetailsByCandidateId/${data._id}`);
	// };

	render() {
		return (
			<MaterialTable
				title="Rounds List"
				columns={columns}
				data={this.state.rounddetails}
				onRowClick={e => {
					console.log(e);
				}}
				editable={{
					onRowAdd: newData =>
						new Promise(resolve => {
							setTimeout(() => {
								resolve();
								// addCandidate(newData)
								  addrounds(this.props.candidate_id,newData).then(res => {
										let data = res.data;
										console.log(data);
										if (data.success === false) return this.setState({ msg: data.message });
										this.getReview();
									})
									.catch(err => {
										console.log(err.message);
									});
							}, 600);
						}),
                     // THESE is object type which we call by key value type
					onRowUpdate: (newData, oldData) =>
					 // creating a promise
						new Promise(resolve => {
							setTimeout(() => {
								resolve();

								console.log(newData);
								editReviewByReviewId(newData._id, newData)
									.then(res => {
										console.log(res.data);
										this.getReview();
									})
									.catch(err => {
										console.log(err.message);
									});
							}, 600);
						}),
					onRowDataChange: data => {
						console.log(data);
					},
					onRowDelete: oldData =>
						new Promise(resolve => {
							setTimeout(() => {
								resolve();
								deleteReviewByReviewId(this.props.candidate_id, oldData._id)
									.then(res => {
										console.log(res.data);
										this.getReview();
									})
									.catch(err => {
										console.log(err.message);
									});
							}, 600);
						})
				}}
			/>
		);
	}
}
