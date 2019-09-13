import React, { Component } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import {connect} from 'react-redux'
import LocalParking from '../Views/LocalParking.png'
import BuildIcon from '../Views/BuildIcon.png'

class MapMarker extends Component {
	state = {
		infoWindowShown: false
	};

	openInfoWindow = () => {
		this.setState({ infoWindowShown: true });
		this.props.dispatch({type: 'FETCH_LOCATION_DETAILS', payload: this.props.marker.id})
	}

	closeInfoWindow = () => {
		this.setState({ infoWindowShown: false });
	};

	getIcon = (type) => {
		switch (type) {
			case 'Bike Rack':
				return LocalParking
			case 'Fixing Station':
				return BuildIcon
			default:
				return;
		}
	}
	render() {
		let icon = this.getIcon(this.props.marker.type_name)

		return (
			<Marker
				position={this.props.position}
				onClick={this.openInfoWindow}
				icon={icon}
				// animation={Animation.DROP}
			>
				{this.state.infoWindowShown && (
					<InfoWindow
						onCloseClick={this.closeWindow}
						position={this.props.position}>
						<div>
							<h1>{this.props.details.rating}</h1>
						</div>
					</InfoWindow>
				)}
			</Marker>
		);
	}
}
const mapStateToProps = reduxStore => ({
	details: reduxStore.locations.locationDetails
})
export default connect(mapStateToProps)(MapMarker);
