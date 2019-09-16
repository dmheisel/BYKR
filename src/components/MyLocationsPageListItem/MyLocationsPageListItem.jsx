import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//material-ui imports
import {
	ListItem,
	ListItemIcon,
	ListItemAvatar,
	ListItemText,
	ListItemSecondaryAction,
	IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import BuildIcon from '@material-ui/icons/Build';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';

const styles = theme => ({
	iconButton: {
		width: 'auto',
		margin: theme.spacing(0),
		padding: theme.spacing(1)
	}
});

class MyLocationsPageList extends Component {
	handlePinClick = () => {
		this.props.history.push(`/home/${this.props.marker.lat}/${this.props.marker.lng}`);
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<ListItem>
					<ListItemAvatar edge='start'>
						{Number(this.props.marker.location_type_id) === 1 ? (
							<LocalParkingIcon />
						) : (
							<BuildIcon />
						)}
					</ListItemAvatar>
					<ListItemText
						primary={
							this.props.markerTypes[this.props.marker.location_type_id - 1]
								.type_name
						}
						secondary={this.props.marker.address}
					/>
					{this.props.type === 'myCreated' && (
						<IconButton
							className={classes.iconButton}
							onClick={() => console.log('delete icon clicked')}>
							<DeleteSweepOutlinedIcon />
						</IconButton>
					)}
					<IconButton
						className={classes.iconButton}
						onClick={this.handlePinClick}>
						<RoomOutlinedIcon />
					</IconButton>

					<ListItemIcon>
						<Rating
							value={Number(this.props.marker.avg_rating)}
							readOnly
							size='small'
							edge='end'
						/>
					</ListItemIcon>
				</ListItem>
			</div>
		);
	}
}

export default connect()(withStyles(styles)(withRouter(MyLocationsPageList)));
