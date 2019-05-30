import React, { Component } from 'react';
import { getCandidates } from 'services/candidate';
import { getAccessToken } from 'services/auth';

import DataTable from 'react-data-table-component';

import 'assets/css/style.css';
const columns = [
	{
		name: 'Name',
		selector: 'name',
		sortable: true
	},
	{
		name: 'email',
		selector: 'email',
		sortable: true,
		right: true
	},
	{
		name: 'Number',
		selector: 'number',
		sortable: true,
		right: true
	}
];

// const ExpanableComponent = ({ data }) =>
class CandidateTable extends Component {
	state = {
		candidates: [],
		infoModel: false,
		addRoundModel: false,
		candidate: null
	};
	componentDidMount() {
		this.getCandidates();
	}

	handleChange = state => {
		console.log(state);
	};

	getCandidates = () => {
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

	render() {
		return (
			<DataTable
				title="Candidates List"
				columns={columns}
				data={this.state.candidates}
				selectableRows
				onTableUpdate={this.handleChange}
				// expandableRows
				// expandableRowsComponent={<ExpanableComponent />}
			/>
		);
	}
}

export default CandidateTable;
