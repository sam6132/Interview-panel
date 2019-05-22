// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';


//  class App extends Component {
//      constructor(props) {
//         super(props);
//          this.state = {
//              interviewdetails : []
//         }
//      }
 


//  componentDidMount() {
//      fetch('url')
//      .then(data => this.setState({interviewdetails : data }))
//  }

//  render() {
//  	return(
// 		<div>
// <Table interviewdetails = {this.state.interviewdetails} />

// 			</div>
// 	)
// }
// }

//


import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Table  extends React.Component {
	render() {
	  return (
		<table class="ui celled table">
		<thead>
		  <tr><th>Name</th>
		  <th>Age</th>
		  <th>Job</th>
		</tr></thead>
		<tbody>
		  <tr>
			<td data-label="Name">James</td>
			<td data-label="Age">24</td>
			<td data-label="Job">Engineer</td>
			<td>
            <Link to={"/Edit"} className="btn btn-primary">Edit</Link>
			</td>
			<td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
		  </tr>
		  <tr>
			<td data-label="Name">Jill</td>
			<td data-label="Age">26</td>
			<td data-label="Job">Engineer</td>
			<td>
            <Link to={"/Edit"} className="btn btn-primary">Edit</Link>
			</td>
			<td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
		  </tr>

		  <tr>
			<td data-label="Name">Elyse</td>
			<td data-label="Age">24</td>
			<td data-label="Job">Designer</td>
		  </tr>
		  
         
		</tbody>
	  </table>
	  )
	}
  }
	export default Table;