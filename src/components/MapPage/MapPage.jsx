import React, { Component } from 'react';
import Map from '../Map/Map';
import { LoadScript } from '@react-google-maps/api';
import SearchBar from '../SearchBar/SearchBar';
import BottomBar from '../BottomBar/BottomBar';

class MapPage extends Component {
	render() {
		return (
			<div>
				<LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
					<SearchBar />
					<Map />
					<BottomBar />
				</LoadScript>
			</div>
		);
	}
}

export default MapPage;
