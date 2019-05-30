import React, { Component } from 'react';
import axios from 'axios';
import 'assets/css/style.css';
import { getCandidates } from 'services/candidate';
import { getAccessToken } from 'services/auth';
import Popover from 'components/Popover';
import 'assets/css/style.css';
import CandidateTable from './CandidateTable';
class TableRow extends Component {
	state = {
		candidates: [],
		infoModel: false,
		addRoundModel: false,
		candidate: null,
		editable: false,
		name: '',
		email: '',
		number: ''
	};
	componentDidMount() {
		this.getCandidates();
	}
	componentWillUnmount() {
		clearInterval();
	}
	getCandidates() {
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
	}
	handleClick = e => {
		this.setState({ editable: !this.state.editable });
	};

	tableContent() {
		// return this.state.candidates.map((can, index) => {
		// 	// if (this.state.editable) {
		// 		return (
		// <tr key={index} candidate={can} onDoubleClick={this.handleClick}>
		// 	<td className="text-center">
		// 		<input type="text" defaultValue={can.name} className="form-control" />
		// 	</td>
		// 	<td className="text-center">
		// 		<input type="text" defaultValue={can.email} className="form-control" />
		// 	</td>
		// 	<td className="text-center">
		// 		<input type="text" defaultValue={can.number} className="form-control" />
		// 	</td>
		// 	<td className="text-center">
		// 		<div>
		// 			<button className="btn btn-success">save</button>
		// 		</div>
		// 	</td>
		// </tr>
		// 	);
		// } else {
		// 	return (
		// 		<tr key={index} candidate={can} onDoubleClick={this.handleClick}>
		// 			<td className="text-center">{can.name}</td>
		// 			<td className="text-center">{can.email}</td>
		// 			<td className="text-center">{can.number}</td>
		// 			<td className="text-center">
		// 				<div>
		// 					<Popover can={can} delete={this.delete} />
		// 				</div>
		// 			</td>
		// 		</tr>
		// 	);
		// }
		// });
	}

	delete = id => {
		axios
			.get('http://localhost:5000/api/candidate/delete/' + id, {
				headers: { 'x-auth': localStorage.getItem('token') }
			})
			.then(res => {
				// let candidates = [res.data] ? [res.data] : [];
				// console.log(candidates);
				this.getCandidates();
				// if (candidates) this.setState({ candidates: candidates });
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div className="card bg-white  shadow  border-10 ">
				<div className=" card-header  bg-secondary pb-2">
					<div className="text-center mb-2">
						<h3>Candidate's</h3>
					</div>
				</div>
				{/* <table className="table table-hover table-sm  ">
					<thead>
						<tr>
							<th className="text-center">Name</th>
							<th className="text-center">Email</th>
							<th className="text-center">Phone number</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>
					<tbody>{this.tableContent()}</tbody>
				</table> */}
			</div>
		);
	}
}

export default TableRow;
