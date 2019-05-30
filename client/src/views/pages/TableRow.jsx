import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {
	constructor(props) {
		super(props);
		this.delete = this.delete.bind(this);
        this.handleMouseHover = this.handleMouseHover.bind(this);
		this.state = {
			isHovering : false ,
			data : []
		}
	}
	componentDidMount() {
		axios
			.get('http://localhost:5000/api/candidate/')
			.then(response => {
				this.setState({
					data: response.data
				});
			})
			.catch(error => {
				console.log(error);
			});
	}
	
	
	handleMouseHover() {
		this.setState(this.toogleHoverState)
	}

	toogleHoverState(state) {
		return {
			isHovering : !state.isHovering,
		}
	}

	delete() {
		axios
			.get('http://localhost:5000/api/candidate/delete/' + this.props.obj._id)
			.then(console.log('DElETED'))
			.catch(err => console.log(err));
	}
	// onHover() {
	// 	axios
	// 	.get('http://localhost:5000/api/candidate/')

	// 	.then(data => <div className="modal-dialog modal-lg"> data</div>)
	// }


	render() {
		return (
			
			<div
			onMouseEnter={this.handleMouseHover}
			onMouseLeave={this.handleMouseHover}
		  >
		
		
			<tr> 
				<td >{this.props.obj.name}</td>
				<td >{this.props.obj.email}</td>
				<td >{this.props.obj.number}</td>
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
				{
					this.state.isHovering &&
					<td>
						<div className="modal-dialog modal-lg"  id = "tablerow">
					 	{this.state.data.map((values) => {
							
							<div className="modal-dialog modal-lg">
							 {values.name}
							</div>
						 } )}
						 </div>
					</td>
				}
			</tr>
			</div>

		);
	}
}

export default TableRow;
