import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {
	constructor(props) {
		super(props);
		this.delete = this.delete.bind(this);
	}

	delete() {
		axios
			.get('http://localhost:5000/api/candidate/delete/' + this.props.obj._id)
			.then(console.log('DElETED'))
			.catch(err => console.log(err));
	}

	render() {
		return (
			<tr>
				<td>{this.props.obj.name}</td>
				<td>{this.props.obj.email}</td>
				<td>{this.props.obj.rounds}</td>
				<td>{this.props.obj.comments}</td>

				<td>
					<Link to={'/edit/' + this.props.obj._id} className="btn btn-primary">
						Edit
					</Link>
				</td>
				<td>
					<button onClick={this.delete} className="btn btn-danger">
						Delete
					</button>
				</td>
			</tr>
		);
	}
}

export default TableRow;
