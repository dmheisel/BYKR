import React, { Component } from 'react';
import Map from '../Map/Map';
import { LoadScript } from '@react-google-maps/api';
import SearchBar from '../SearchBar/SearchBar'


class MapPage extends Component {
	render() {
		const { classes } = this.props;
		return (
			<LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
				<SearchBar />
				<Map />
			</LoadScript>
		);
	}
}

export default MapPage;
