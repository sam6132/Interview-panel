import React, { Component } from 'react';
import { Modal } from 'reactstrap';

export default class Loading extends Component {
	render() {
		return (
			<div>
				<div>
					<div className="d-flex justify-content-center">
						<div className="spinner-border" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
