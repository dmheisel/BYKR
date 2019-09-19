import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	centerButton: {
		position: 'absolute',
		height: '40px',
		width: '40px',
		minWidth: '40px',
		bottom: '95px',
		right: '60px',
		marginBottom: '10px',
		zIndex: '1',
		backgroundColor: 'white'
	}
});

class CenterButton extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Button
				variant='contained'
				className={classes.centerButton}
				onClick={() =>
					//dispatch sets center of map back to user's default location.
					this.props.user.use_device_location
						? this.props.dispatch({
								type: 'FETCH_CENTER',
								payload: { id: this.props.user.id }
						  })
						: this.props.dispatch({
								type: 'SET_CENTER',
								payload: {
									lat: Number(this.props.user.lat),
									lng: Number(this.props.user.lng)
								}
						  })
				}>
				<GpsFixedIcon />
			</Button>
		);
	}
}
const mapStateToProps = reduxStore => ({
	user: reduxStore.user
});

export default connect(mapStateToProps)(withStyles(styles)(CenterButton));
