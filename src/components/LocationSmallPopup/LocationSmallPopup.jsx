import React, { Component } from 'react';
import { InfoWindow } from '@react-google-maps/api';
import { connect } from 'react-redux';
import TypeMenu from '../TypeMenu/TypeMenu';
import { Link } from '@material-ui/core';

class LocationSmallPopup extends Component {
	state = {
		anchorEl: null,
		moreDetails: false
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
		let commentHtml =
			//if there are no comments for this location, server returns array with first value null
			//this conditional prevents list from being rendered if the first value is null (no comments)
			this.props.comments ? (
				<ul>
					{this.props.comments.map(
						(commentObject, index) =>
							index < 3 && (<li key={commentObject.id}>{commentObject.comment}</li>)

					)}
				</ul>
			) : null;

		return (
			<InfoWindow
				onCloseClick={this.props.closeWindow}
				position={this.props.position}>
				<div>
					<h3>{this.props.displayedLocation.address}</h3>
					<h1>{this.props.displayedLocation.rating}</h1>
					{commentHtml}
					{this.props.user.id ===
						this.props.displayedLocation.created_by_user_id && (
						<div>
							<button onClick={this.props.deleteMarker}>Delete</button>
							<button onClick={this.handleOpen}>Change Location Type</button>
						</div>
					)}
					<Link
						component='button'
						variant='body2'
						onClick={this.props.toggleMoreDetails}>
						More Details...
					</Link>
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
	user: reduxStore.user,
	comments: reduxStore.comments
});
export default connect(mapStateToProps)(LocationSmallPopup);
