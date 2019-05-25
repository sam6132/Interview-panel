import React, { PureComponent, Component } from 'react';
import { Button, Modal } from 'reactstrap';
import 'assets/css/style.css';
import { ReactComponent as noData } from 'assets/img/svg/no-data.svg';
// iimport { ReactComponent as noData } from 'assets/img/svg/no-data.svg';
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
												<div className="card-body info-model">
													<h4 className="card-title text-center">{round.title}</h4>
													<p className="card-text text-dark text-center">{round.comment}</p>
												</div>
												<div className="card-footer text-primary text-center">
													{round.qualified + ''}
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
