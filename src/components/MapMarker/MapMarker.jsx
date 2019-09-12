import React, { Component } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import LocalParking from '../Views/LocalParking.png'
import BuildIcon from '../Views/BuildIcon.png'

class MapMarker extends Component {
	state = {
		infoWindowShown: false
	};

	toggleInfoWindow = () => {
		this.setState({ infoWindowShown: !this.state.infoWindowShown });
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
				onClick={this.toggleInfoWindow}
				icon={icon}
				// animation={Animation.DROP}
			>
				{this.state.infoWindowShown && (
					<InfoWindow
						onCloseClick={this.toggleInfoWindow}
						position={this.props.position}>
						<div>
							<h1>{this.props.marker.type_name}</h1>
						</div>
					</InfoWindow>
				)}
			</Marker>
		);
	}
}

export default MapMarker;
