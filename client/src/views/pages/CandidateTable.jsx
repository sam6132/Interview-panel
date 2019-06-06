import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { getCandidates } from 'services/candidate';
import { getAccessToken } from 'services/auth';
import { addCandidate } from 'services/candidate';
import { editCandidateById } from 'services/candidate';
import { deleteCandidateById } from 'services/candidate';
const columns = [
	{ title: 'Name', field: 'name' },
	{ title: 'Email', field: 'email' },
	{ title: 'Number', field: 'number', type: 'numeric' },
	{ title: 'Team Lead', field: 'team_lead', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } },
	{ title: 'Team Member', field: 'team_member', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } },
	{ title: 'Status', field: 'status' }
];

export default class CandidateTable extends Component {
	state = {
		candidates: []
	};

	componentDidMount() {
		this.getCandidates();
	}

	getCandidates = () => {
		getCandidates()
			.then(response => {
				if (response.data.success === false) {
					getAccessToken();
					return;
				}
				this.setState({
					candidates: response.data
				});
			})
			.catch(error => {
				console.log(error);
			});
	};

	navEdit = (e, data) => {
		this.props.history.push(`/edit/${data._id}`, data);
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

								editCandidateById(newData._id, newData)
									.then(res => {
										this.getCandidates();
									})
									.catch(err => {
										console.log(err.msg);
									});
							}, 600);
						}),
					onRowDataChange: data => {},
					onRowDelete: oldData =>
						new Promise(resolve => {
							setTimeout(() => {
								resolve();
								deleteCandidateById(oldData._id)
									.then(res => {
										this.getCandidates();
									})
									.catch(err => {
										console.log(err.msg);
									});
							}, 600);
						})
				}}
			/>
		);
	}
}
