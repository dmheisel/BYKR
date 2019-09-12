import React, { Component } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

class MapMarker extends Component {
	state = {
		infoWindowShown: false
	};

	toggleInfoWindow = () => {
		this.setState({ infoWindowShown: !this.state.infoWindowShown });
	};

	render() {
		return (
			<Marker position={this.props.position} onClick={this.toggleInfoWindow}>
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
