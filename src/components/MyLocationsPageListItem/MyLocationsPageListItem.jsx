import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//material-ui imports
import {
	ListItem,
	ListItemIcon,
	ListItemAvatar,
	ListItemText,
	IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import BuildIcon from '@material-ui/icons/Build';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';

const styles = theme => ({
	listItem: {
		padding: '5px'
	},
	iconButton: {
		width: 'auto',
		margin: theme.spacing(0),
		padding: theme.spacing(1)
	}
});

class MyLocationsPageList extends Component {
	state = {
		openDialog: false
	};

	handlePinClick = () => {
		this.props.history.push(
			`/home/${this.props.marker.lat}/${this.props.marker.lng}`
		);
	};

	handleDeleteClick = () => {
		this.props.dispatch({
			type: 'DELETE_MARKER',
			payload: this.props.marker.location_id
		});
	};

	toggleConfirmationDialog = () => {
		this.setState({ openDialog: !this.state.openDialog });
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<ListItem
					disableGutters={true}
					divider={true}
					className={classes.listItem}>
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
						secondary={
							this.props.marker.locality
								? this.props.marker.address + ', ' + this.props.marker.locality
								: this.props.marker.address
						}
					/>
					{this.props.type === 'myCreated' && (
						<IconButton
							className={classes.iconButton}
							onClick={this.toggleConfirmationDialog}>
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
				<ConfirmationDialog
					open={this.state.openDialog}
					handleDeleteClick={this.handleDeleteClick}
					toggleConfirmationDialog={this.toggleConfirmationDialog}
				/>
			</div>
		);
	}
}

export default connect()(withStyles(styles)(withRouter(MyLocationsPageList)));
