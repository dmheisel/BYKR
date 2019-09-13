import React, { Component } from 'react';
import { InfoWindow } from '@react-google-maps/api';
import { connect } from 'react-redux';
import TypeMenu from '../TypeMenu/TypeMenu';

class LocationSmallPopup extends Component {
	state = {
		anchorEl: null
	};

	handleOpen = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleSelect = event => {
		this.props.dispatch({
			type: 'UPDATE_MARKER_TYPE',
			payload: {
				id: this.props.displayedLocation.id,
				type_id: event.target.value
			}
		});
		this.handleClose();
		this.props.closeWindow();
	};

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
					{this.props.user.id ===
						this.props.displayedLocation.created_by_user_id && (
						<div>
							<button onClick={this.props.deleteMarker}>Delete</button>
							<button onClick={this.handleOpen}>Change Location Type</button>
						</div>
					)}
					<TypeMenu
						id='simple-menu'
						anchorEl={this.state.anchorEl}
						keepMounted
						open={Boolean(this.state.anchorEl)}
						handleClose={this.handleClose}
						handleSelect={this.handleSelect}
					/>
				</div>
			</InfoWindow>
		);
	}
}
const mapStateToProps = reduxStore => ({
	displayedLocation: reduxStore.locations.displayedLocation,
	user: reduxStore.user
});
export default connect(mapStateToProps)(LocationSmallPopup);
