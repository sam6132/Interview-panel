import React from 'react';

// core components

// index page sections
import Hero from './IndexSections/Hero.jsx';

class Index extends React.Component {
	componentDidMount() {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		this.refs.main.scrollTop = 0;
	}
	render() {
		return (
			<div>
				<main ref="main">
					<Hero />
				</main>
			</div>
		);
	}
}

export default Index;
