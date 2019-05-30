import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { getCandidates } from 'services/candidate';
import { getAccessToken } from 'services/auth';
import { addCandidate } from 'services/candidate';
import { editCandidateById } from 'services/candidate';
const columns = [
	{ title: 'Name', field: 'name' },
	{ title: 'Email', field: 'email' },
	{ title: 'Number', field: 'number', type: 'numeric' }
	// {
	// 	title: 'Birth Place',
	// 	field: 'birthCity',
	// 	lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }
	// }
];

export default class CandidateTable extends Component {
	state = {
		candidates: []
		// infoModel: false,
		// addRoundModel: false,
		// candidate: null
	};

	componentDidMount() {
		this.getCandidates();
	}

	getCandidates = () => {
		console.log(this.props);

		getCandidates()
			.then(response => {
				if (response.data.success === false) {
					getAccessToken();
					return;
				}
				// console.log(response.data);
				this.setState({
					candidates: response.data
				});
				// console.log(this.state.candidates);
			})
			.catch(error => {
				console.log(error);
			});
	};

	navEdit = (e, data) => {
		console.log(data);
		this.props.history.push(`/edit/${data._id}`);
	};

	render() {
		return (
			<MaterialTable
				title="Candidates List"
				columns={columns}
				data={this.state.candidates}
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
										this.getCandidates();
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
								// const data = [...this.state.candidates];
								// data.splice(data.indexOf(oldData), 1);
								// this.setState({ ...this.state, data });
							}, 600);
						})
				}}
			/>
		);
	}
}
