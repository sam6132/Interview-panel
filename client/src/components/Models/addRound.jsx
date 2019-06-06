import React, { PureComponent, Component } from 'react';
import { Button, Modal } from 'reactstrap';
import axios from 'axios';

export default class AddRoundModel extends Component {
	state = {
		addRoundModel: false,
		title: '',
		comment: '',
		qualified: false
	};

	onSubmit = e => {
		e.preventDefault();
		const round = {
			title: this.state.title,
			comment: this.state.comment,
			qualified: this.state.qualified
		};

		axios
			.post('http://localhost:5000/api/candidate/update/' + this.props.candidateId, round, {
				headers: { 'x-auth': sessionStorage.getItem('token') }
			})
			.then(res => {
				let data = res['data'];
				this.setState({
					title: '',
					comment: '',
					qualified: false,
					addRoundModel: true
				});
			})
			.catch(err => {
				console.log(err.msg);
			});

		// this.props.history.push('/Profile');
	};

	render() {
		return (
			<div>
				<Modal
					className="modal-dialog-centered"
					isOpen={this.props.addRoundModel}
					toggle={() => this.props.toggleModal('addRoundModel')}
				>
					<div className="modal-header">
						<h6 className="modal-title" id="modal-title-default">
							Update Candidate Details
						</h6>
						<button
							aria-label="Close"
							className="close"
							data-dismiss="modal"
							type="button"
							onClick={() => this.props.toggleModal('addRoundModel')}
						>
							<span aria-hidden={true}>×</span>
						</button>
					</div>
					<div className="modal-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<label>Round Title: </label>
								<input
									type="text"
									className="form-control"
									value={this.state.title}
									onChange={e => {
										this.setState({ title: e.target.value });
									}}
								/>
							</div>
							<div className="form-group">
								<label>Comments: </label>
								<input
									type="text"
									className="form-control"
									value={this.state.comment}
									onChange={e => {
										this.setState({ comment: e.target.value });
									}}
								/>
							</div>
							<div className="custom-control custom-control-alternative custom-checkbox">
								<input
									className="custom-control-input"
									value={this.state.qualified}
									onChange={e => {
										this.setState({ qualified: e.target.checked });
									}}
									id=" customCheckLogin"
									type="checkbox"
								/>
								<label className="custom-control-label" htmlFor=" customCheckLogin">
									<span>Qualified</span>
								</label>
							</div>
							<div className="modal-footer">
								<div className="form-group">
									<input type="submit" value="Update Details" className="btn btn-primary" />
								</div>
							</div>
						</form>
					</div>
				</Modal>
			</div>
		);
	}
}
