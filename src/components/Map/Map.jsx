import React, { Component } from 'react';
import { GoogleMap, BicyclingLayer } from '@react-google-maps/api';
import { connect } from 'react-redux';

class Map extends Component {
	render() {
		return (
			<GoogleMap
				id='mainPageMap'
				mapContainerStyle={{
					height: '100vh',
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
			><BicyclingLayer /></GoogleMap>
		);
	}
}
const mapStateToProps = reduxStore => ({
	user: reduxStore.user
});
export default connect(mapStateToProps)(Map);
