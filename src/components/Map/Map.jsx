import React, { Component } from 'react';
import { GoogleMap, BicyclingLayer, Marker } from '@react-google-maps/api';
import { connect } from 'react-redux';
import MapMarker from '../MapMarker/MapMarker';
import BlueCircle from '../Views/bluecircle.png';
import BikeDock from '../Views/Bike-Rack.png'

class Map extends Component {
	state = {
		map: this.props.map || {}
	};

	updateCenter = () => {
		let newCenter = {
			lat: this.props.map.getCenter().lat(),
			lng: this.props.map.getCenter().lng()
		};
		this.props.dispatch({ type: 'SET_CENTER', payload: newCenter });
	};

	render() {
		const markersHtml = this.props.markers.markerList.map((marker, index) => (
			<MapMarker
				key={index}
				marker={marker}
				index={index}
				position={{
					lat: Number(marker.lat),
					lng: Number(marker.lng) || Number(marker.lon)
				}}
			/>
		));
		const apiMarkersHtml =
			this.props.markers.apiMarkerList &&
			this.props.markers.apiMarkerList.map((marker, index) => (
				<Marker
					key={index}
					position={{ lat: marker.lat, lng: marker.lon }}
					icon={BikeDock}
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
					// mapCenter will exist when map has been moved, otherwise default to user
					lat: this.props.mapCenter.lat || Number(this.props.user.lat) ,
					lng: this.props.mapCenter.lng || Number(this.props.user.lng)
				}}
				onLoad={map => {
					// map.setCenter({lat: Number(this.props.user.lat), lng: Number(this.props.user.lng)})
					this.props.dispatch({ type: 'SET_MAP', payload: map });
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
				{apiMarkersHtml}
				<Marker
					position={{
						lat: Number(this.props.user.lat),
						lng: Number(this.props.user.lng)
					}}
					icon={BlueCircle}
				/>
				{/* not sure if conditional rendering is needed here. */}
			</GoogleMap>
		);
	}
}
const mapStateToProps = reduxStore => ({
	user: reduxStore.user,
	map: reduxStore.map,
	markers: reduxStore.markers,
	mapCenter: reduxStore.mapCenter
});
export default connect(mapStateToProps)(Map);
