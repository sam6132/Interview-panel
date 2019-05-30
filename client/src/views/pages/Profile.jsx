import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import Create from './Create';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import  Header  from './Nav';

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
				<div>		
				<Header/>	
				</div>
			   
				<div className = "text-right primary center">
				<button type="button" className="btn btn-outline-primary">get </button>
				</div>
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
{/* <img  ref="image" src={http://media.licdn.com/dms/image/C560BAQEIOV9rnI_qmQ/company-logo_200_200/0?e=2159024400&v=beta&t=L__DJr6JencaOhdCm8y1zV5t4N_jITyuAOm7fDW4DQ0} />
				</nav> */}