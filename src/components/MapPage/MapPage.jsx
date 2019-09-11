import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../Map/Map';
import { LoadScript } from '@react-google-maps/api';
import SearchBar from '../SearchBar/SearchBar';
import BottomBar from '../BottomBar/BottomBar';

class MapPage extends Component {
	state = {
		addMode: false,
		typeSelected: null,
		locations: []
	};

	toggleAddMode = () => {
		console.log(!this.state.addMode);
		this.setState({ addMode: !this.state.addMode });
	};
	selectType = value => {
		console.log(value);
		this.setState({ typeSelected: value });
		this.toggleAddMode()
	};

	addLocation = location => {
		if (this.state.addMode) {
			this.props.dispatch({
				type: 'ADD_LOCATION',
				payload: {
					coords: { lat: location.latLng.lat(), lng: location.latLng.lng() },
					type: this.state.typeSelected
				}
			});
			this.toggleAddMode();
		}
	};

	render() {
		return (
			<div>
				<LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
					<SearchBar />
					<Map
						addLocation={this.addLocation}
					/>
					<BottomBar
						toggleAddMode={this.toggleAddMode}
						addMode={this.state.addMode}
						selectType={this.selectType}
					/>
				</LoadScript>
			</div>
		);
	}
}

export default connect()(MapPage);
