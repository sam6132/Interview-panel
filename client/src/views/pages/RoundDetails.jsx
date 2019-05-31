import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { getCandidates } from 'services/candidate';
import { getAccessToken } from 'services/auth';
import { addCandidate } from 'services/candidate';
import { editCandidateById } from 'services/candidate';
import {editRounddetails} from 'services/candidate';
import { getRoundDetailsByCandidateId } from 'services/candidate';

const columns = [
	{ title: 'round', field: 'title' },
	{ title: 'comment', field: 'comment' },
	{ title: 'qualified', field: 'qualified', }
];

export default class RoundDetailTable extends Component {
	state = {
		rounddetails: [],
		candidate_id:''
	};

	componentDidMount() {

		this.getReview();
	}

	getReview = async () => {
		console.log("we are printhing props");
		console.log(this.props.candidate_id);

		// await this.setState({candidate_id : this.props.candidate_id})

		await getRoundDetailsByCandidateId(this.props.candidate_id)
			.then(response => {
				console.log(response.data)
				this.setState({rounddetails:response.data})
			})
			.catch(error => {
				console.log(error);
			});
	};

	// navEdit = (e, data) => {
	// 	console.log(data);
	// 	this.props.history.push(`/edit/${data._id}`);
	// };

	render() {
		return (
			<MaterialTable
				title="Rounds List"
				columns={columns}
				data={this.state.rounddetails}
				onRowClick={this.navEdit}
				editable={{
					onRowAdd: newData =>
						new Promise(resolve => {
							setTimeout(() => {
								resolve();
								addCandidate(newData)
									.then(res => {
										let data = res.data;
										console.log(data);
										if (data.success === false) return this.setState({ msg: data.message });
										this.getRoundDetailsByCandidateId();
									})
									.catch(error => {
										this.setState({ msg: error.message });
									});
							}, 600);
						}),

					onRowUpdate: (newData, oldData) =>
						new Promise(resolve => {
							setTimeout(() => {
								resolve();
								// console.log('new Candidate :', newData);
								// console.log('old Candidate :', oldData);

								editCandidateById(newData._id, newData)
									.then(res => {
										this.getCandidates();
									})
									.catch(err => {
										console.log(err.msg);
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
								const data = [...this.state.candidates];
								 data.splice(data.indexOf(oldData), 1);
								 this.setState({ ...this.state, data });
							}, 600);
						})
				}}
			/>
		);
	}
}
