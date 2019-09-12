import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../Map/Map';
import { LoadScript } from '@react-google-maps/api';
import SearchBar from '../SearchBar/SearchBar';
import BottomBar from '../BottomBar/BottomBar';
import SideBar from '../SideBar/SideBar'

class MapPage extends Component {
	state = {
		addMode: false,
		typeSelected: null,
		locations: [],
		drawerOpen: false
	};

	//toggles add mode on or off -- can only add locations if currentlyin add mode
	toggleAddMode = () => {
		console.log(!this.state.addMode);
		this.setState({ addMode: !this.state.addMode });
	};
	//sets type of location to add from menu select
	selectType = value => {
		console.log(value);
		this.setState({ typeSelected: value });
		this.toggleAddMode();
	};

	//dispatches new location to database, re-toggles add mode
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

	toggleDrawer = () => {
		this.setState({ drawerOpen: !this.state.drawerOpen });
	};

	render() {
		return (
			<div>
				<LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
					<SideBar drawerOpen={this.state.drawerOpen} toggleDrawer={this.toggleDrawer}/>
					<SearchBar toggleDrawer={this.toggleDrawer}/>
					<Map addLocation={this.addLocation} />
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
