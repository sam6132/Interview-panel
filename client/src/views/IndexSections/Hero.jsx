import React from 'react';

// reactstrap components
import { Button, Container, Row, Col } from 'reactstrap';

class Hero extends React.Component {
	render() {
		return (
			<div>
				<div className="position-relative">
					{/* Hero for FREE version */}
					<section className="section section-lg section-hero section-shaped">
						{/* Background circles */}
						<div className="shape shape-style-1 shape-default">
							<span className="span-150" />
							<span className="span-50" />
							<span className="span-50" />
							<span className="span-75" />
							<span className="span-100" />
							<span className="span-75" />
							<span className="span-50" />
							<span className="span-100" />
							<span className="span-50" />
							<span className="span-100" />
						</div>
						<Container className="shape-container d-flex align-items-center py-lg">
							<div className="col px-0" />
						</Container>
						{/* SVG separator */}
					</section>
				</div>
			</div>
		);
	}
}

export default Hero;
