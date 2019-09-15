import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InfoWindow } from '@react-google-maps/api';
import {
	Grid,
	Link,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Typography,
	IconButton
} from '@material-ui/core';
import LocalParking from '../Views/LocalParking.png';
import BuildIcon from '../Views/BuildIcon.png';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CommentIcon from '@material-ui/icons/Comment';
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import CommentDialogue from '../CommentDialogue/CommentDialogue';
import TypeMenu from '../TypeMenu/TypeMenu';

const styles = theme => ({
	root: {
		display: 'flex',
		width: '60vw',
		height: '40vh'
	},
	header: {
		height: '15%'
	},
	list: {
		height: '50%',
		overflow: 'auto',
		border: '2px black'
	},
	listRoot: {
		width: '100%'
	},
	footer: {
		height: '15%'
	},
	subfooter: {
		height: '5%'
	}
});

class LocationInfoPopUp extends Component {
	state = {
		anchorEl: null,
		dialogOpen: false
	};


	handleOpen = event => {
		this.props.user.id === this.props.selectedMarker.created_by_user_id &&
			this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleSelect = event => {
		this.props.dispatch({
			type: 'UPDATE_MARKER_TYPE',
			payload: {
				id: this.props.selectedMarker.id,
				type_id: event.target.value
			}
		});
		this.handleClose();
	};

	handleDialogClose = () => {
		this.setState({ dialogOpen: false });
	};
	handleDialogOpen = () => {
		this.setState({ dialogOpen: true });
	};
	handleSaveClick = () => {
		this.props.user.saved_locations.includes(this.props.selectedMarker.id)
			? this.props.dispatch({
					type: 'REMOVE_SAVED_LOCATION',
					payload: this.props.selectedMarker.id
			  })
			: this.props.dispatch({
					type: 'ADD_SAVED_LOCATION',
					payload: this.props.selectedMarker.id
			  });
	};

	updateRating = (event, newValue) => {
		this.props.dispatch({
			type: this.props.selectedMarker.userRating
				? 'UPDATE_USER_RATING'
				: 'ADD_USER_RATING',
			payload: { id: this.props.selectedMarker.id, rating: newValue }
		});
	};

	getAvatarIcon = () => {
		switch (this.props.selectedMarker.location_type) {
			case 1:
				return LocalParking;
			case 2:
				return BuildIcon;
			default:
				return null;
		}
	};
	render() {
		const { classes } = this.props;

		//makes comment list to display on map info window
		const commentsList =
			//if there are no comments for this location, server returns array with first value null
			//this conditional prevents list from being rendered if the first value is null (no comments)
			this.props.comments && (
				<List className={classes.listRoot} dense>
					{this.props.comments.map((commentObject, index) => {
						return (
							<ListItem key={commentObject.id} alignItems='flex-start'>
								<ListItemAvatar>
									<AccountCircleTwoToneIcon />
								</ListItemAvatar>
								<ListItemText
									primary={commentObject.username}
									secondary={commentObject.comment}
								/>
							</ListItem>
						);
					})}
				</List>
			);

		return (
			<>
				<InfoWindow
					onCloseClick={this.props.closeWindow}
					position={this.props.position}
					className={classes.root}>
					<Grid className={classes.root} container>
						<Grid container className={classes.header}>
							<Grid item xs={2}>
								<Avatar src={this.getAvatarIcon()} onClick={this.handleOpen} />
							</Grid>
							<Grid item xs={5}>
								<Typography variant='subtitle1'>Parking Rack</Typography>
								<Typography variant='caption' noWrap={true}>
									{this.props.selectedMarker.address}
								</Typography>
							</Grid>
							<Grid item xs={5}>
								<Rating
									value={Number(this.props.selectedMarker.avgRating)}
									readOnly
									size='small'
								/>
							</Grid>
						</Grid>
						<Grid container className={classes.list}>
							<Grid item xs={12}>
								{commentsList}
							</Grid>
						</Grid>
						<Grid container className={classes.footer}>
							<Grid item xs={3}>
								<IconButton
									aria-label={'save to favorites'}
									onClick={this.handleSaveClick}>
									{this.props.user.saved_locations.includes(
										this.props.selectedMarker.id
									) ? (
										<BookmarkIcon />
									) : (
										<BookmarkBorderIcon />
									)}
								</IconButton>
							</Grid>
							<Grid item xs={6}>
								<Typography component='legend'>Add Rating!</Typography>
								<Rating
									name='addNewRating'
									value={Number(this.props.selectedMarker.userRating)}
									onChange={this.updateRating}
								/>
							</Grid>
							<Grid item xs={3}>
								<IconButton
									aria-label={'add comment'}
									onClick={this.handleDialogOpen}>
									<CommentIcon />
								</IconButton>
							</Grid>
						</Grid>

					</Grid>
				</InfoWindow>
				<CommentDialogue
					handleClose={this.handleDialogClose}
					handleOpen={this.handleDialogOpen}
					dialogOpen={this.state.dialogOpen}
				/>
				<TypeMenu
					id='simple-menu'
					anchorEl={this.state.anchorEl}
					keepMounted
					open={Boolean(this.state.anchorEl)}
					handleClose={this.handleClose}
					handleSelect={this.handleSelect}
				/>
			</>
		);
	}
}
const mapStateToProps = reduxStore => ({
	selectedMarker: reduxStore.selectedMarker,
	user: reduxStore.user,
});

export default connect(mapStateToProps)(withStyles(styles)(LocationInfoPopUp));
