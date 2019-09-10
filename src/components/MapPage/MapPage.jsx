import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../Map/Map';
import { LoadScript } from '@react-google-maps/api';

class MapPage extends Component {
	render() {
		return (
			<LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
				<Map />
			</LoadScript>
		);
	}
}

export default MapPage;
