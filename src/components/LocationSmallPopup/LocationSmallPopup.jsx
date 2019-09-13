import React, { Component } from 'react';
import { InfoWindow } from '@react-google-maps/api';
import { connect } from 'react-redux';

class LocationSmallPopup extends Component {
	render() {
		let commentHtml = this.props.displayedLocation.comments ? (
			<ul>
				{this.props.displayedLocation.comments.comment.map((comment, index) => {
					while (index < 3) {
						return <li key={index}>{comment}</li>;
					}
				})}
			</ul>
		) : null;

		return (
			<InfoWindow
				onCloseClick={this.props.closeWindow}
				position={this.props.position}>
				<div>
					<h1>{this.props.displayedLocation.rating}</h1>
					{commentHtml}
					<button onClick={this.props.deleteMarker}>Delete</button>
				</div>
			</InfoWindow>
		);
	}
}
const mapStateToProps = reduxStore => ({
	displayedLocation: reduxStore.locations.displayedLocation
});
export default connect(mapStateToProps)(LocationSmallPopup);
