import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { getCandidates } from 'services/candidate';
import { getAccessToken } from 'services/auth';
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

export default class MaterialTableDemo extends Component {
	state = {
		candidates: [],
		infoModel: false,
		addRoundModel: false,
		candidate: null
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
			<MaterialTable
				title="Editable Example"
				columns={columns}
				data={this.state.candidates}
				editable={{
					onRowAdd: newData =>
						new Promise(resolve => {
							setTimeout(() => {
								resolve();
								const data = [...this.state.candidates];
								data.push(newData);
								this.setState({ ...this.state, data });
							}, 600);
						}),

					onRowUpdate: (newData, oldData) =>
						new Promise(resolve => {
							setTimeout(() => {
								resolve();
								const data = [...this.state.candidates];
								data[data.indexOf(oldData)] = newData;
								this.setState({ ...this.state, data });
							}, 600);
						}),
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
