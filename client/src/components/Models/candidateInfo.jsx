import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { Link } from 'react-router-dom';

import 'assets/css/style.css';

export default class CandidateInfo extends Component {
	state = {
		infoModel: false
	};

	render() {
		return (
			<div>
				<Modal
					className="modal-dialog-centered modal-lg  modal-default"
					isOpen={this.props.infoModel}
					toggle={() => this.props.toggleModal('infoModel')}
				>
					<div className="modal-header">
						<h6 className="modal-title" id="modal-title-default">
							{this.props.candidate ? this.props.candidate.name : ''}
						</h6>

						<button
							aria-label="Close"
							className="close"
							data-dismiss="modal"
							type="button"
							onClick={() => this.props.toggleModal('infoModel')}
						>
							<span aria-hidden={true}>×</span>
						</button>
					</div>
					<div className="modal-body">
						{this.props.candidate
							? this.props.candidate.rounds.map(round => {
									return (
										<div key={round._id}>
											<div className="card my-sm mx-0">
												{round.qualified ? (
													<div className="card-header text-center bg-success">Qualified</div>
												) : (
													<div className="card-header text-center bg-danger">
														{round.qualified + ''}
													</div>
												)}
												<div className="card-body info-model">
													<h4 className="card-title col-11 text-center">{round.title}</h4>
													<p className="card-text text-dark text-center">{round.comment}</p>
												</div>
												<div className="card-footer text-primary text-center">
													<Link
														to={`/edit-review/${this.props.candidate._id}&${round._id}`}
														className="btn btn-md btn-primary pull-left "
													>
														<span className="btn-inner--icon">
															<i className="fa fa-edit" />
														</span>
													</Link>
												</div>
											</div>
										</div>
									);
								})
							: ''}
					</div>
				</Modal>
			</div>
		);
	}
}
