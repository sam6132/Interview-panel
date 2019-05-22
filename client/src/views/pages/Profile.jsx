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

// export default Profile;


import React, { Component } from 'react';

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
		  </tr>
		  <tr>
			<td data-label="Name">Jill</td>
			<td data-label="Age">26</td>
			<td data-label="Job">Engineer</td>
		  </tr>
		  <tr>
			<td data-label="Name">Elyse</td>
			<td data-label="Age">24</td>
			<td data-label="Job">Designer</td>
		  </tr>
		  <td>
            <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
		</tbody>
	  </table>
	  )
	}
  }
