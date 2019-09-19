import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InfoWindow } from '@react-google-maps/api';
import {
	Grid,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Divider,
	Avatar,
	Typography,
	IconButton
} from '@material-ui/core';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import BuildIcon from '@material-ui/icons/Build';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CommentIcon from '@material-ui/icons/Comment';
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import InputDialog from '../InputDialog/InputDialog';
import TypeMenu from '../TypeMenu/TypeMenu';

const styles = theme => ({
	root: {
		display: 'flex',
		width: '60vw',
		height: '30vh'
	},
	icon: {
		backgroundColor: theme.palette.primary.dark
	},
	header: {},
	list: {
		height: '50%',
		overflow: 'auto',
		width: '100%',
		backgroundColor: theme.palette.background.primary.main
	},
	listRoot: {
		width: '100%'
	},
	footer: {}
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
					type: 'UNSAVE_MARKER',
					payload: this.props.selectedMarker.id
			  })
			: this.props.dispatch({
					type: 'SAVE_MARKER',
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
		switch (this.props.selectedMarker.location_type_id) {
			case 1:
				return <LocalParkingIcon />;
			case 2:
				return <BuildIcon />;
			default:
				return null;
		}
	};
	render() {
		const { classes } = this.props;

		//makes comment list to display on map info window
		const commentsList = (
			<List className={classes.listRoot} dense>
				{this.props.selectedMarker.comments.length > 0 ? (
					this.props.selectedMarker.comments.map((commentObject, index) => {
						return (
							<>
								<ListItem key={commentObject.id} alignItems='flex-start'>
									<ListItemAvatar>
										<AccountCircleTwoToneIcon />
									</ListItemAvatar>
									<ListItemText
										primary={commentObject.username}
										secondary={commentObject.comment}
									/>
								</ListItem>
								<Divider />
							</>
						);
					})
				) : (
					<ListItem button onClick={this.handleDialogOpen}>
						<ListItemText secondary='Leave a comment?' />
					</ListItem>
				)}
			</List>
		);
		// const locationTypeName = this.props.markerTypes && this.props.selectedMarker && this.props.markerTypes.find(item => item.id == this.props.selectedMarker.location_type_id).type_name;
		return (
			<>
				<InfoWindow
					onCloseClick={this.props.closeWindow}
					position={this.props.position}
					className={classes.root}>
					<Grid
						direction='column'
						justify='space-between'
						alignItems='flex-start'
						className={classes.root}
						container>
						<Grid
							container
							direcion='row'
							justify='space-between'
							align='center'
							className={classes.header}>
							<Grid item xs={2}>
								<Avatar className={classes.icon} onClick={this.handleOpen}>
									{this.getAvatarIcon()}
								</Avatar>
							</Grid>
							<Grid item xs={4} align='center'>
								<Typography variant='subtitle1'>Filler Text</Typography>
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
						<Grid container align='center' className={classes.list}>
							<Grid item align='center' xs={12}>
								{commentsList}
							</Grid>
						</Grid>
						<Grid
							container
							direction='row'
							justify='space-around'
							alignItems='flex-start'
							align='center'
							className={classes.footer}>
							<Grid align='center' item xs={2}>
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
							<Grid item xs={6} align='center'>
								<Typography component='legend'>Add Rating!</Typography>
								<Rating
									name='addNewRating'
									value={Number(this.props.selectedMarker.userRating)}
									onChange={this.updateRating}
								/>
							</Grid>
							<Grid align='center' item xs={2}>
								<IconButton
									aria-label={'add comment'}
									onClick={this.handleDialogOpen}>
									<CommentIcon />
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				</InfoWindow>
				<InputDialog
					handleClose={this.handleDialogClose}
					handleOpen={this.handleDialogOpen}
					onConfirm={inputText =>
						this.props.dispatch({
							type: 'ADD_USER_COMMENT',
							payload: {
								locationId: this.props.selectedMarker.id,
								comment: inputText
							}
						})
					}
					dialogOpen={this.state.dialogOpen}
					dialogTitle='Leave a Comment?'
					dialogTextLabel='Add Your Comment'
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
	markerTypes: reduxStore.markers.markerTypes,
	user: reduxStore.user
});

export default connect(mapStateToProps)(withStyles(styles)(LocationInfoPopUp));
