import React, { Component } from 'react';
import { Marker } from '@react-google-maps/api';
import { connect } from 'react-redux';
import LocalParking from '../Views/LocalParking.png';
import BuildIcon from '../Views/BuildIcon.png';
import LocationSmallPopup from '../LocationSmallPopup/LocationSmallPopup';

class MapMarker extends Component {

	//uses redux state to set displayed info window
	openInfoWindow = () => {
		this.props.dispatch({
			type: 'FETCH_LOCATION_DETAILS',
			payload: this.props.marker.id
		});
	};

	//clears displayed info window from redux state
	closeWindow = () => {
		this.props.dispatch({ type: 'CLEAR_DISPLAYED_LOCATION' });
	};

	deleteMarker = () => {
		this.props.dispatch({type: 'DELETE_MARKER', payload: this.props.marker.id})
	}

	//chooses correct icon based on type of location
	getIcon = type => {
		switch (type) {
			case 'Bike Rack':
				return LocalParking;
			case 'Fixing Station':
				return BuildIcon;
			default:
				return;
		}
	};
	render() {
		let icon = this.getIcon(this.props.marker.type_name);

		return (
			<Marker
				position={this.props.position}
				onClick={this.openInfoWindow}
				icon={icon}
				// animation={Animation.DROP}
			>
				{/* conditionally render infowindow only if this marker id is in redux as displayed */}
				{this.props.marker.id === this.props.displayedLocation.id && (

					<LocationSmallPopup
						closeWindow={this.closeWindow}
						position={this.props.position}
						deleteMarker={this.deleteMarker}
						/>
				)}
			</Marker>
		);
	}
}
const mapStateToProps = reduxStore => ({
	displayedLocation: reduxStore.locations.displayedLocation
});
export default connect(mapStateToProps)(MapMarker);
