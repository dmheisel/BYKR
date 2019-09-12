import React, { Component } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

class MapMarker extends Component {
	state = {
		infoWindowShown: false
	}

	toggleInfoWindow = () => {
		this.setState({ infoWindowShown: !this.state.infoWindowShown })
	}

	render() {
		return (
			<Marker
				position={this.props.position}
				onClick={this.toggleInfoWindow}>
				{this.state.infoWindowShown && (
					<InfoWindow
						onCloseClick={this.toggleInfoWindow}
						position={this.props.position}>
						<div
							style={{
								background: `white`,
								border: `1px solid #ccc`,
								padding: 15
							}}>
							<h1>InfoWindow</h1>
						</div>
					</InfoWindow>
				)}
			</Marker>
		);
	}
}

export default MapMarker;
