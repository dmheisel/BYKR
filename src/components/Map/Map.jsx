import React, { Component } from 'react';
import { GoogleMap, BicyclingLayer } from '@react-google-maps/api';
import { connect } from 'react-redux';
import MapMarker from '../MapMarker/MapMarker'

class Map extends Component {
	state = {
		map: {}
	};

	componentDidMount() {
		this.props.dispatch({ type: 'FETCH_LOCATIONS' });
		this.props.dispatch({
			type: 'SET_CENTER',
			payload: {
				lat: Number(this.props.user.lat),
				lng: Number(this.props.user.lng)
			}
		});
	}
	updateCenter = () => {
		let newCenter = {
			lat: this.state.map.getCenter().lat(),
			lng: this.state.map.getCenter().lng()
		};
		this.props.dispatch({ type: 'SET_CENTER', payload: newCenter });
	};

	render() {
		let markersHtml = this.props.markers.map(marker => (
			<MapMarker
				key={marker.id}
				marker={marker}
				position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
			/>
		));
		return (
			<GoogleMap
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
					lat: this.props.mapCenter.lat || Number(this.props.user.lat),
					lng: this.props.mapCenter.lng || Number(this.props.user.lng)
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
				{this.props.markers && markersHtml}
				{/* not sure if conditional rendering is needed here. */}
			</GoogleMap>
		);
	}
}
const mapStateToProps = reduxStore => ({
	user: reduxStore.user,
	markers: reduxStore.locations.markers,
	mapCenter: reduxStore.mapCenter
});
export default connect(mapStateToProps)(Map);
