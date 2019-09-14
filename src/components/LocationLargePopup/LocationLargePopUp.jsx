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
		moreDetails: false,
		ratingValue: 0
	};

	handleOpen = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleSaveClick = () => {
		this.props.user.saved_locations.includes(this.props.displayedLocation.id)
			? this.props.dispatch({
					type: 'REMOVE_SAVED_LOCATION',
					payload: this.props.displayedLocation.id
			  })
			: this.props.dispatch({
					type: 'ADD_SAVED_LOCATION',
					payload: this.props.displayedLocation.id
			  });
	};

	updateRating = (event, newValue) => {
		this.props.dispatch({
			type: 'UPDATE_RATING',
			payload: { id: this.props.displayedLocation.id, newRating: newValue }
		});
	};

	getAvatarIcon = () => {
		switch (this.props.displayedLocation.location_type) {
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
			this.props.displayedLocation.comments.comment[0] !== null ? (
				<List>
					{this.props.displayedLocation.comments.comment.map(
						(comment, index) => {
							return (
								<ListItem key={index}>
									<ListItemAvatar>
										<AccountCircleTwoToneIcon />
									</ListItemAvatar>
									<ListItemText>{comment}</ListItemText>
								</ListItem>
							);
						}
					)}
				</List>
			) : null;

		return (
			<InfoWindow
				onCloseClick={this.props.closeWindow}
				position={this.props.position}
				className={classes.root}>
				<Grid className={classes.root} container>
					<Grid container className={classes.header}>
						<Grid item xs={2}>
							<Avatar src={this.getAvatarIcon()} />
						</Grid>
						<Grid item xs={5}>
							<Typography variant='subtitle1'>Parking Rack</Typography>
							<Typography variant='caption' noWrap={true}>
								{this.props.displayedLocation.address}
							</Typography>
						</Grid>
						<Grid item xs={5}>
							<Rating
								value={Number(this.props.displayedLocation.rating)}
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
									this.props.displayedLocation.id
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
								value={this.state.ratingValue}
								onChange={this.updateRating}
							/>
						</Grid>
						<Grid item xs={3}>
							<IconButton aria-label={'add comment'}>
								<CommentIcon />
							</IconButton>
						</Grid>
					</Grid>
					<Grid container className={classes.subfooter}>
						<Grid item xs={12}>
							<Link
								component='button'
								variant='body2'
								onClick={this.props.toggleMoreDetails}>
								<Typography variant='caption'>Less Details...</Typography>
							</Link>
						</Grid>
					</Grid>
				</Grid>
			</InfoWindow>
		);
	}
}
const mapStateToProps = reduxStore => ({
	displayedLocation: reduxStore.locations.displayedLocation,
	user: reduxStore.user
});

export default connect(mapStateToProps)(withStyles(styles)(LocationInfoPopUp));
