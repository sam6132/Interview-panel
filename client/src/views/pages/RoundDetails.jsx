import { getCandidates } from 'services/candidate';
import { getAccessToken } from 'services/auth';
import { editCandidateById } from 'services/candidate';
import {editRounddetails} from 'services/candidate';
import { deleteCandidateById } from 'services/candidate';
import { getRoundDetailsByCandidateId } from 'services/candidate';
import { updateRoundDetailsByCandidateId } from 'services/candidate';
import {addrounds} from 'services/candidate';
import {addrounds} from 'services/candidate';

const columns = [
	{ title: 'round', field: 'title' },
	{ title: 'comment', field: 'comment' },
	{ title: 'qualified', field: 'qualified', lookup: { true: 'yes', false: 'no' } },
	{ title: 'qualified', field: 'qualified', }
];

export default class RoundDetailTable extends Component {
	state = {
		rounddetails: [],
		candidate_id: ''
		candidate_id:''
	};

	componentDidMount() {

		this.getReview();
	}

	getReview = async () => {
		console.log('we are printhing props');
		console.log("we are printhing props");
		console.log(this.props.candidate_id);

		// await this.setState({candidate_id : this.props.candidate_id})

		await getRoundDetailsByCandidateId(this.props.candidate_id)
			.then(response => {
				console.log(response.data);
				this.setState({ rounddetails: response.data });
				console.log(response.data)
				this.setState({rounddetails:response.data})
			})
			.catch(error => {
				console.log(error);
			});
	};
	// have to write put api
  // have to write put api 
	// navEdit = (e, data) => {
	// 	console.log(data);
	// 	this.props.history.push(`/updateRoundDetailsByCandidateId/${data._id}`);
@ -52,9 +54,7 @@ export default class RoundDetailTable extends Component {
				title="Rounds List"
				columns={columns}
				data={this.state.rounddetails}
				onRowClick={e => {
					console.log(e);
				}}
				onRowClick={this.navEdit}
				editable={{
					onRowAdd: newData =>
						new Promise(resolve => {
@ -67,8 +67,8 @@ export default class RoundDetailTable extends Component {
										if (data.success === false) return this.setState({ msg: data.message });
										this.getReview();
									})
									.catch(err => {
										console.log(err.message);
									.catch(error => {
										this.setState({ msg: error.message });
									});
							}, 600);
						}),
@ -78,17 +78,27 @@ export default class RoundDetailTable extends Component {
						new Promise(resolve => {
							setTimeout(() => {
								resolve();

								console.log(newData);
								editReviewByReviewId(newData._id, newData)
									.then(res => {
										console.log(res.data);
										this.getReview();
									})
									.catch(err => {
										console.log(err.message);
									});
							}, 600);
								 console.log('new Candidate :', newData);
								console.log('old Candidate :', oldData);
								 console.log(newData._id);	
								 console.log() 
								 updateRoundDetailsByCandidateId(newData._id, newData)
								 	.then(res => {
										 console.log(res);
								 		console.log(this.props.candidate_id);
								 		this.getReview();
								 	})
								 	.catch(err => {
								 		console.log(err.msg);
								 	});
								//  console.log(newData)
							 	// this.getReview().then(res=>{
							 	 	// console.log(res)
							 	 	// this.getReview()
							 	// }).catch(err=>{
								 	// console.log(err.message)
							 	//  })
							}, 6000);
						}),
					onRowDataChange: data => {
						console.log(data);
@ -97,14 +107,10 @@ export default class RoundDetailTable extends Component {
						new Promise(resolve => {
							setTimeout(() => {
								resolve();
								deleteReviewByReviewId(this.props.candidate_id, oldData._id)
									.then(res => {
										console.log(res.data);
										this.getReview();
									})
									.catch(err => {
										console.log(err.message);
									});
								// data 
								const data = [...this.state.candidates];
								 data.splice(data.indexOf(oldData), 1);
								 this.setState({ ...this.state, data });
							}, 600);
						})
				}}