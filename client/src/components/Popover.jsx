import React, { Component } from 'react';
import { DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import CandidateInfo from 'components/Models/candidateInfo';
import AddRoundModel from 'components/Models/addRound';
import { Link } from 'react-router-dom';

class Popover extends Component {
	state = {
		infoModel: false,
		addRoundModel: false,
		candidate: null
	};

	toggleInfoModal = state => {
		// this.getCandidates();

		this.setState({
			[state]: !this.state.infoModel
		});
	};
	toggleRoundModal = state => {
		this.setState({
			[state]: !this.state.addRoundModel
		});
	};
	render() {
		return (
			<div>
				<CandidateInfo
					infoModel={this.state.infoModel}
					candidate={this.state.candidate}
					toggleModal={this.toggleInfoModal}
				/>
				<AddRoundModel
					addRoundModel={this.state.addRoundModel}
					candidateId={this.state.candidate ? this.state.candidate._id : ''}
					toggleModal={this.toggleRoundModal}
				/>
				<UncontrolledDropdown>
					<DropdownToggle caret color="default" aria-label="setting">
						<span>
							<i className="fa fa-cogs" aria-hidden="true" />
						</span>
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem
							onClick={async () => {
								// await this.getCandidates();
								await this.toggleInfoModal('infoModel');
								this.setState({ candidate: this.props.can });
							}}
						>
							Information
						</DropdownItem>
						<Link className="dropdown-item" to={`/edit/${this.props.can._id}`}>
							Edit
						</Link>
						<DropdownItem
							onClick={() => {
								this.toggleRoundModal('addRoundModel');
								this.setState({ candidate: this.props.can });
							}}
						>
							Add review
						</DropdownItem>

						<DropdownItem
							onClick={() => {
								this.props.delete(this.props.can._id);
							}}
						>
							Delete
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</div>
		);
	}
}

export default Popover;
