import React, { Component } from 'react';
import { GoogleMap, BicyclingLayer } from '@react-google-maps/api';
import { connect } from 'react-redux';

class Map extends Component {

	componentDidMount() {
		this.props.dispatch({type: 'FETCH_LOCATIONS'})
	}

	render() {
		return (
			<GoogleMap
				// id='mainPageMap'
				mapContainerStyle={{
					height: '90vh',
					width: '100vw'
				}}
				zoom={15}
				center={{
					lat: Number(this.props.user.lat),
					lng: Number(this.props.user.lng)
				}}
				options={{
					scaleControl: true,
					mapTypeControl: false,
					streetViewControl: false,
					fullscreenControl: false,
					zoomControl: true,
				}}
				onClick={event => {
					console.log(event.latLng.lat(), event.latLng.lng())
				}}
			><BicyclingLayer /></GoogleMap>
		);
	}
}
const mapStateToProps = reduxStore => ({
	user: reduxStore.user
});
export default connect(mapStateToProps)(Map);
