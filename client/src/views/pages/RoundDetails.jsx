import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { getRoundDetailsByCandidateId } from 'services/candidate';
import { updateRoundDetailsByCandidateId } from 'services/candidate';
import { addReview } from 'services/review';
import { editReviewByReviewId } from 'services/review';
import { deleteReviewByReviewId } from 'services/review';

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
		console.log(this.props.match.params.id);

		// await this.setState({candidate_id : this.props.match.params.id})

		await getRoundDetailsByCandidateId(this.props.match.params.id)
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
				onRowClick={(e, data) => {
					this.props.history.push(`/review/${this.props.match.params.id}&${data._id}`);
				}}
				editable={{
					onRowAdd: newData =>
						new Promise(resolve => {
							setTimeout(() => {
								resolve();
								addReview(this.props.match.params.id, newData)
									.then(res => {
										this.getReview();
										console.log(res.data);
									})
									.catch(err => {
										console.log(err.message);
									});
							}, 600);
						}),

					onRowUpdate: (newData, oldData) =>
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
								deleteReviewByReviewId(this.props.match.params.id, oldData._id)
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
