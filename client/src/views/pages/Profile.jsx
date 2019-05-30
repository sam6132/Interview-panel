import React, { Component } from 'react';
import CandidateTable from './CandidateTable';

import TableRow from './TableRow';
import Header from 'components/Navbars/Nav';

import 'assets/css/style.css';
import Create from './Create';
import EditableTable from './EditableTable';
// import MaterialTable from './MaterialTable';
export default class Profile extends Component {
	render() {
		return (
			<div>
				<Header />
				<main className="header">
					<section className="section section-shaped section-lg">
						<div className="shape shape-style-1 bg-gradient-default">
							<span />
							<span />
							<span />
							<span />
						</div>
					</section>
				</main>

				<div className="m-sm ">
					<div className="">
						<div className=" pb-sm">
							{/* <TableRow /> */}
							{/* <TableRow className="mb-md" />*/}
							<CandidateTable {...this.props} />
							{/* <EditableTable /> */}
						</div>
						{/* <div className="col-md-4">
							<Create />
						</div> */}
					</div>
				</div>
			</div>
		);
	}
}
{/* <img  ref="image" src={http://media.licdn.com/dms/image/C560BAQEIOV9rnI_qmQ/company-logo_200_200/0?e=2159024400&v=beta&t=L__DJr6JencaOhdCm8y1zV5t4N_jITyuAOm7fDW4DQ0} />
				</nav> */}