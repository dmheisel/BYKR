import React, { Component } from 'react';
import { GoogleMap } from '@react-google-maps/api';
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
				zoom={11}
				center={{
					lat: Number(this.props.user.lat),
					lng: Number(this.props.user.lng)
				}}
			/>
		);
	}
}
const mapStateToProps = reduxStore => ({
	user: reduxStore.user
});
export default connect(mapStateToProps)(Map);
