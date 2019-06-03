import React, { Component } from 'react';
import axios from 'axios';
import { addCandidate } from 'services/candidate';
import Header from 'components/Navbars/Nav';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import svgHeader from 'assets/svg/header.svg';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15)
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary
	},
	icon: {
		verticalAlign: 'bottom',
		height: 20,
		width: 20
	},
	details: {
		alignItems: 'center'
	},
	column: {
		flexBasis: '33.33%'
	},
	helper: {
		borderLeft: `2px solid ${theme.palette.divider}`,
		padding: theme.spacing(1, 2)
	},
	link: {
		color: theme.palette.primary.main,
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline'
		}
	}
}));

export default class Create extends Component {
	state = {};
	render() {
		return (
			<div>
				<Header />

				{this.state.loading ? (
					<div className=" loader-container">
						<div className="loader m-auto" />
					</div>
				) : (
					<div>
						<div className=" shadow-lg  mx-auto mb-sm">
							{/* <img src={svgHeader} alt="" sizes="" srcset=""/> */}
						</div>
						<div className="container">
							<ExpansionPanel defaultExpanded>
								<ExpansionPanelSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1c-content"
									id="panel1c-header"
								>
									<div>
										<Typography>Location</Typography>
									</div>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails className="row">
									<div className="col-md-8">
										<Chip label="Barbados" onDelete={() => {}} />
									</div>
									<div className="col-md-4">
										<Typography variant="caption">
											Select your destination of choice
											<br />
											<a href="#sub-labels-and-columns">Learn more</a>
										</Typography>
									</div>
								</ExpansionPanelDetails>
								<Divider />
								<ExpansionPanelActions>
									<Button size="small">Cancel</Button>
									<Button size="small" color="primary">
										Save
									</Button>
								</ExpansionPanelActions>
							</ExpansionPanel>
						</div>
					</div>
				)}
			</div>
		);
	}
}
