import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//material-ui imports
import {
	ListItem,
	ListItemIcon,
	ListItemAvatar,
	ListItemText,
	IconButton,
	Grid,
	Typography,
	Divider
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import BuildIcon from '@material-ui/icons/Build';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const styles = theme => ({
	listItem: {
		padding: '5px'
	},
	iconButton: {
		width: 'auto',
		margin: theme.spacing(0),
		padding: theme.spacing(1)
	},
	gotoIcon: {
		color: theme.palette.primary.dark
	},
	deleteIcon: {
		color: theme.palette.secondary.dark
	},
	close: {
		padding: theme.spacing(0.5)
	}
});

class MyLocationsPageList extends Component {
	state = {
		openDialog: false
	};

	handlePinClick = () => {
		this.props.toggleDrawer();
		this.props.dispatch({
			type: 'SET_CENTER',
			payload: {
				lat: Number(this.props.marker.lat),
				lng: Number(this.props.marker.lng)
			}
		});
	};

	handleConfirmFor = (event, type) => {
		type === 'delete' ? this.handleDeleteClick() : this.handleSaveClick();
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

	handleSaveClick = () => {
		console.log(this.props.marker);
		this.props.user.saved_locations.includes(this.props.marker.location_id)
			? this.toggleConfirmationDialog()
			: this.bookmarkSite();
	};

	handleRemoveBookmarkClick = () => {
		this.props.dispatch({
			type: 'UNSAVE_MARKER',
			payload: this.props.marker.location_id
		});
	};
	
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Grid container direction='column'>
					<Grid item xs={12}>
						<ListItem
							disableGutters={true}
							divider={false}
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
										? this.props.marker.address +
										  ', ' +
										  this.props.marker.locality
										: this.props.marker.address
								}
							/>
							{this.props.type === 'created_locations' ? (
								<IconButton
									className={classes.iconButton}
									onClick={this.toggleConfirmationDialog}>
									<DeleteSweepOutlinedIcon className={classes.deleteIcon} />
								</IconButton>
							) : (
								<IconButton
									aria-label={'save to favorites'}
									onClick={this.toggleConfirmationDialog}>
									{this.props.user.saved_locations.some(
										el => el.location_id === this.props.marker.location_id
									) ? (
										<BookmarkIcon color='secondary' />
									) : (
										<BookmarkBorderIcon color='secondary' />
									)}
								</IconButton>
							)}

							<IconButton
								className={classes.iconButton}
								onClick={this.handlePinClick}>
								<RoomOutlinedIcon className={classes.gotoIcon} />
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
					</Grid>
					{this.props.marker.user_note && (
						<Grid container item xs={12} justify='flex-end'>
							<Typography variant='caption'>
								note: {this.props.marker.user_note}
							</Typography>
						</Grid>
					)}
					<Divider />
				</Grid>
				<ConfirmationDialog
					open={this.state.openDialog}
					handleConfirmClick={
						this.props.type === 'created_locations'
							? this.handleDeleteClick
							: this.handleRemoveBookmarkClick
					}
					toggleConfirmationDialog={this.toggleConfirmationDialog}
					title={
						this.props.type === 'created_locations'
							? 'Confirm Delete'
							: 'Confirm Remove Bookmark'
					}
					buttonText={
						this.props.type === 'created_locations' ? 'Delete' : 'Remove'
					}
				/>
			</div>
		);
	}
}
const mapStateToProps = reduxStore => ({
	user: reduxStore.user
});
export default connect(mapStateToProps)(
	withStyles(styles)(withRouter(MyLocationsPageList))
);
