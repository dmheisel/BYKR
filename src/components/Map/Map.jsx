import React, { Component } from 'react';
import { GoogleMap, BicyclingLayer } from '@react-google-maps/api';
import { connect } from 'react-redux';
import MapMarker from '../MapMarker/MapMarker';

class Map extends Component {
	state = {
		map: {}
	};
	updateCenter = () => {
		let newCenter = {
			lat: this.state.map.getCenter().lat(),
			lng: this.state.map.getCenter().lng()
		};
		this.props.dispatch({ type: 'SET_CENTER', payload: newCenter });
		this.props.dispatch({ type: 'FETCH_MARKERS' })
		console.log(this.props.markers.markerList.length)
	};

	render() {
		const markersHtml = this.props.markers.markerList.map((marker, index) => (
			<MapMarker
				key={index}
				marker={marker}
				index={index}
				position={{ lat: Number(marker.lat), lng: Number(marker.lng) || Number(marker.lon) }}
			/>
		));

		return (
			<GoogleMap
				id='base-map'
				mapContainerStyle={{
					height: '90vh',
					width: '100vw'
				}}
				zoom={18}
				center={{
					lat: this.props.mapCenter.lat || Number(this.props.user.lat),
					lng: this.props.mapCenter.lng || Number(this.props.user.lng)
				}}
				onLoad={map => {
					map.setMapTypeId('hybrid');
					this.setState({
						map: map
					});
				}}
				options={{
					scaleControl: true,
					mapTypeControl: false,
					fullscreenControl: false,
					zoomControl: true
				}}
				onClick={event => {
					this.props.addLocation(event);
				}}
				onDragEnd={this.updateCenter}>
				<BicyclingLayer />
				{markersHtml}
				{/* not sure if conditional rendering is needed here. */}
			</GoogleMap>
		);
	}
}
const mapStateToProps = reduxStore => ({
	user: reduxStore.user,
	markers: reduxStore.markers,
	mapCenter: reduxStore.mapCenter
});
export default connect(mapStateToProps)(Map);
