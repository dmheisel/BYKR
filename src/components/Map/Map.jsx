import React, { Component } from 'react';
import { GoogleMap, BicyclingLayer, Marker } from '@react-google-maps/api';
import { connect } from 'react-redux';

class Map extends Component {
	state = {
		map: {},
		center: {
			lat: Number(this.props.user.lat),
			lng: Number(this.props.user.lng)
		}
	};

	componentDidMount() {
		this.props.dispatch({ type: 'FETCH_LOCATIONS' });
	}
	updateCenter = () => {
		let newCenter = this.state.map.getCenter();
		this.setState({
			center: {
				lat: newCenter.lat(),
				lng: newCenter.lng()
			}
		});
	};

	render() {
		let markersHtml = this.props.locations.map(location => (
			<Marker
				key={location.id}
				position={{ lat: Number(location.lat), lng: Number(location.lng) }}
			/>
		));
		return (
			<GoogleMap
				// id='mainPageMap'
				mapContainerStyle={{
					height: '90vh',
					width: '100vw'
				}}
				onLoad={map =>
					this.setState({
						map: map,
						center: { lat: map.getCenter().lat(), lng: map.getCenter().lng() }
					})
				}
				zoom={15}
				center={{
					lat: this.state.center.lat,
					lng: this.state.center.lng
				}}
				options={{
					scaleControl: true,
					mapTypeControl: false,
					streetViewControl: false,
					fullscreenControl: false,
					zoomControl: true
				}}
				onClick={event => {
					this.props.addLocation(event);
				}}
				onDragEnd={this.updateCenter}>
				<BicyclingLayer />
				{this.props.locations ? markersHtml : null}
			</GoogleMap>
		);
	}
}
const mapStateToProps = reduxStore => ({
	user: reduxStore.user,
	locations: reduxStore.locations
});
export default connect(mapStateToProps)(Map);
