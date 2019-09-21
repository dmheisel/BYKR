import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import InputDialog from '../InputDialog/InputDialog';

class BookmarkButton extends Component {
	state = { dialogOpen: false };

	handleSaveClick = inSaved => {
		console.log(inSaved);
		inSaved ? this.removeBookmark() : this.handleDialogOpen();
	};
	removeBookmark = () => {
		this.props.handleSnackbarOpen('Bookmark Removed!');
		this.props.dispatch({
			type: 'UNSAVE_MARKER',
			payload: this.props.markerId
		});
	};
	bookmarkSite = note => {
		this.props.handleSnackbarOpen('Site Bookmarked!');
		this.props.dispatch({
			type: 'SAVE_MARKER',
			payload: { id: this.props.markerId, note: note }
		});
	};
	handleDialogClose = () => {
		this.setState({ dialogOpen: false });
	};
	handleDialogOpen = () => {
		this.setState({ dialogOpen: true });
	};

	render() {
		const inSaved =
			this.props.user.saved_locations &&
			this.props.user.saved_locations.some(
				loc => loc.location_id === this.props.markerId
			);
		return (
			<div>
				<IconButton
					aria-label={'save to favorites'}
					onClick={() => this.handleSaveClick(inSaved)}>
					{inSaved ? (
						<BookmarkIcon color='secondary' />
					) : (
						<BookmarkBorderIcon color='secondary' />
					)}
				</IconButton>
				<InputDialog
					handleClose={this.handleDialogClose}
					handleOpen={this.handleDialogOpen}
					onConfirm={note => this.bookmarkSite(note)}
					dialogOpen={this.state.dialogOpen}
					notMandatory={true}
					dialogTitle='Add a note to remember your bookmark?'
					dialogTextLabel='Add your note'
				/>
			</div>
		);
	}
}
const mapStateToProps = reduxStore => ({
	user: reduxStore.user
});
export default connect(mapStateToProps)(BookmarkButton);
