import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = { interview: [] };
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/api/candidate/')
			.then(response => {
				this.setState({
					interview: response.data
				});
			})
			.catch(error => {
				console.log(error);
			});
	}
	tabRow() {
		return this.state.interview.map((object, i) => {
			return <TableRow obj={object} key={i} />;
		});
	}

	render() {
		return (
			<div>
				<h3 align="center">CandidateList</h3>
				<table className="table table-striped" style={{ marginTop: 20 }}>
					<thead>
						<tr>
							<th>PERSON</th>
							<th>EMAIL</th>
							<th>PHONENUMBER</th>
							<th>ROUNDS</th>
							<th>COMMENTS</th>
							<th colSpan="2">Action</th>
						</tr>
					</thead>
					<tbody>{this.tabRow()}</tbody>
				</table>
			</div>
		);
	}
}
